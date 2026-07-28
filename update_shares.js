const fs = require('fs');
const path = require('path');

const handleShareSnippet = `
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Orbit Wealth Pro Calculator',
          text: 'Check out this financial calculator!',
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          navigator.clipboard.writeText(window.location.href);
          alert('Calculator link copied to clipboard!');
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Calculator link copied to clipboard!');
    }
  };
`;

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

const calculatorFiles = files.filter(f => {
  // Let's find files that contain '<Share2 ' or 'Download PDF' and are calculators
  const content = fs.readFileSync(path.join(componentsDir, f), 'utf-8');
  return content.includes('Download PDF') || content.includes('<Share2');
});

console.log("Found calculator files: ", calculatorFiles.length);

for (const file of calculatorFiles) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Insert handleShare before return (
  if (content.includes('handleShare')) {
    continue; // already added
  }

  // Find the last return ( before the component end
  const returnIndex = content.lastIndexOf('return (');
  if (returnIndex !== -1) {
    content = content.slice(0, returnIndex) + handleShareSnippet + '\n  ' + content.slice(returnIndex);
  }

  // Find the Share button and add onClick
  // The button usually looks like <button ...> \n <Share2 ... /> ... </button>
  // We can just regex replace the Share button tag if it doesn't have onClick
  
  // Or we can find <Share2 and its parent button
  // Let's just use regex to add onClick={handleShare} to the button that contains <Share2
  
  // Regex to find a button tag that doesn't have onClick, but encloses <Share2
  const buttonWithShareRegex = /<button(?![^>]*onClick)[^>]*>(?:\s*|.*?)<Share2/gs;
  
  let match;
  let newContent = content;
  let addedShareOnClick = false;
  
  if (newContent.match(buttonWithShareRegex)) {
     newContent = newContent.replace(/<button(?![^>]*onClick)([^>]*)>(?=\s*<Share2)/g, '<button onClick={handleShare}$1>');
     addedShareOnClick = true;
  }
  
  // For files like CAGRCalculator that don't have <Share2, should we add the button next to Download PDF?
  if (!newContent.includes('<Share2')) {
      const downloadButtonRegex = /(<button[^>]*onClick=\{downloadPDF\}[^>]*>.*?<\/button>)/s;
      const shareButtonStr = `
        <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-base text-black font-bold transition-all shadow-lg shadow-[#D4AF37]/20">
          <Share2 className="w-4 h-4" /> Share
        </button>`;
      
      if (newContent.match(downloadButtonRegex)) {
         newContent = newContent.replace(downloadButtonRegex, `$1${shareButtonStr}`);
         // need to import Share2 if not imported
         if (!newContent.includes('Share2')) {
            newContent = newContent.replace(/import \{([^}]+)\} from 'lucide-react';/, "import { $1, Share2 } from 'lucide-react';");
         }
         addedShareOnClick = true;
      }
  } else {
      // It has Share2. Let's make sure it has onClick
      // Some buttons might have <Share2 not exactly after <button
      // Let's do a more robust replacement.
      // E.g., <button className="..."> <Share2
      const moreRobustRegex = /<button([^>]*)>(\s*<Share2)/g;
      newContent = newContent.replace(moreRobustRegex, (match, attrs, inner) => {
          if (attrs.includes('onClick')) return match;
          return `<button onClick={handleShare}${attrs}>${inner}`;
      });
  }

  if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log('Updated', file);
  }
}

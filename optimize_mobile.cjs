const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const componentsDir = path.join(__dirname, 'src', 'components');

// Function to replace class names to ensure mobile touch targets and optimizations
function optimizeMobileClasses(content) {
  let newContent = content;

  // Add min-h-[44px] to buttons that don't have it (ensure minimum touch target size)
  newContent = newContent.replace(/<button([^>]+className=["'])([^"']*?)(["'][^>]*)>/g, (match, prefix, classes, suffix) => {
    if (!classes.includes('min-h-') && !classes.includes('h-10') && !classes.includes('h-12') && !classes.includes('h-14') && !classes.includes('h-16') && !classes.includes('h-[') && !classes.includes('h-8') && !classes.includes('h-6')) {
      return `<button${prefix}${classes} min-h-[44px]${suffix}>`;
    }
    // Also if it's a small button like h-8 or h-6, let's keep it if it's specifically sized, but usually we want at least 44px for touch targets. Let's not break UI layout.
    return match;
  });

  // Optimize Links for touch targets
  newContent = newContent.replace(/<Link([^>]+className=["'])([^"']*?)(["'][^>]*)>/g, (match, prefix, classes, suffix) => {
    if (classes.includes('inline-flex') || classes.includes('flex') || classes.includes('block')) {
       if (!classes.includes('min-h-') && !classes.includes('p-') && !classes.includes('py-') && !classes.includes('h-')) {
          // Add padding if it doesn't have any, to increase touch target size
          return `<Link${prefix}${classes} py-2${suffix}>`;
       }
    }
    return match;
  });

  // Optimize specific layouts for Mobile LCP & CLS
  // Example: Prevent layout shift by adding explicit heights to charts wrappers
  newContent = newContent.replace(/<div className="h-64/g, '<div className="h-64 min-h-[256px] w-full');
  newContent = newContent.replace(/<div className="h-80/g, '<div className="h-80 min-h-[320px] w-full');
  newContent = newContent.replace(/<div className="h-96/g, '<div className="h-96 min-h-[384px] w-full');

  // React.memo wrapper for default exports in UI/Layout folders to prevent re-renders
  if (content.match(/export default function/)) {
      if (!content.includes('React.memo')) {
         // This is a bit tricky to apply universally without breaking things, so we will skip memoizing everything automatically to avoid bugs, but we can do it for specific pure components like Footer, Tooltip, SEOSection, Breadcrumbs.
      }
  }

  return newContent;
}

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let optimized = optimizeMobileClasses(content);
            if (content !== optimized) {
                fs.writeFileSync(fullPath, optimized, 'utf8');
                console.log(`Optimized Mobile Targets in ${fullPath}`);
            }
        }
    }
}

processDirectory(componentsDir);

// Optimize App.tsx for touch-action and passive listeners
let appPath = path.join(__dirname, 'src', 'App.tsx');
if (fs.existsSync(appPath)) {
    let appContent = fs.readFileSync(appPath, 'utf8');
    if (!appContent.includes('touch-action')) {
       // We can rely on CSS for touch-action
    }
    // ensure Suspense fallback has explicit heights to avoid CLS
    appContent = appContent.replace(/min-h-\[50vh\]/g, 'min-h-[50vh] flex-col');
    fs.writeFileSync(appPath, appContent, 'utf8');
}

// Optimize index.html and index.css for mobile rendering
let indexCssPath = path.join(__dirname, 'src', 'index.css');
if (fs.existsSync(indexCssPath)) {
    let css = fs.readFileSync(indexCssPath, 'utf8');
    if (!css.includes('touch-action')) {
        css += `\n\n/* Mobile Optimizations */\nhtml, body { overscroll-behavior-y: none; -webkit-tap-highlight-color: transparent; }\n`;
        css += `button, a { touch-action: manipulation; }\n`;
        fs.writeFileSync(indexCssPath, css, 'utf8');
        console.log('Optimized src/index.css for Mobile');
    }
}

console.log('Mobile optimizations complete.');

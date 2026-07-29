const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "SEOSection" src/components/ | grep -E "Calculator|Planner|Snowball|Payoff|Transfer|Yield|Eligibility|CurrencyConverter"').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  if (!content.includes("import { Link } from 'react-router-dom';")) {
    if (content.includes("import { useParams } from 'react-router-dom';")) {
      content = content.replace("import { useParams } from 'react-router-dom';", "import { useParams, Link } from 'react-router-dom';");
    } else if (content.includes("import { useNavigate } from 'react-router-dom';")) {
      content = content.replace("import { useNavigate } from 'react-router-dom';", "import { useNavigate, Link } from 'react-router-dom';");
    } else {
       // Insert it after React import
       content = content.replace("import React", "import { Link } from 'react-router-dom';\nimport React");
    }
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Added Link to ${file}`);
  }
});

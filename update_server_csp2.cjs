const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.rss2json.com;",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.rss2json.com https://api.worldbank.org;"
);

fs.writeFileSync('server.ts', content);

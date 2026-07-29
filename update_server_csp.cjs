const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.rss2json.com;"
);

content = content.replace(
  "img-src 'self' data: https://i.ibb.co;",
  "img-src 'self' data: https://i.ibb.co https://images.unsplash.com;"
);

fs.writeFileSync('server.ts', content);

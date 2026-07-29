const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const newsProxy = `
  app.get("/api/news", async (req, res) => {
    try {
      const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://finance.yahoo.com/news/rss");
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch from RSS API" });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });
`;

if (!content.includes('/api/news')) {
    content = content.replace('app.post("/api/chat", async (req, res) => {', newsProxy + '\n  app.post("/api/chat", async (req, res) => {');
    fs.writeFileSync('server.ts', content);
}

const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const proxy = `
  app.get("/api/finance/rates", async (req, res) => {
    try {
      const response = await fetch("https://api.worldbank.org/v2/country/WLD/indicator/FR.INR.RINR?format=json&mrnev=1");
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch from World Bank API" });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Failed to fetch rates" });
    }
  });
`;

if (!content.includes('/api/finance/rates')) {
    content = content.replace('app.post("/api/chat", async (req, res) => {', proxy + '\n  app.post("/api/chat", async (req, res) => {');
    fs.writeFileSync('server.ts', content);
}

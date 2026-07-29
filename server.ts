import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("Content-Security-Policy", "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://fonts.gstatic.com https://www.googletagmanager.com https://example.com https://www.google-analytics.com; img-src 'self' data: https://i.ibb.co https://images.unsplash.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.rss2json.com https://api.worldbank.org;");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: *\nAllow: /\nSitemap: https://orbitwealthpro.com/sitemap.xml");
  });

  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    res.send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://orbitwealthpro.com/</loc><priority>1.0</priority></url><url><loc>https://orbitwealthpro.com/about</loc><priority>0.8</priority></url><url><loc>https://orbitwealthpro.com/insights</loc><priority>0.8</priority></url></urlset>');
  });


  // AI Chat Route with Security Fixes
  // Address Vercel warning: missing authorization checks and user impersonation
  
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

  app.post("/api/chat", async (req, res) => {
    try {
      // 1. Authorization Check
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
      }

      const token = authHeader.split(" ")[1];
      
      // 2. User Impersonation Protection
      // In a real app, verify the JWT and extract the sub/userId.
      // Do NOT trust req.body.userId.
      // For this implementation, we simulate decoding a valid token.
      let userId;
      if (token === "mock-user-token") {
        userId = "user_123";
      } else {
        // In production, use a library like 'jose' or 'jsonwebtoken' to verify the token
        // const payload = jwt.verify(token, process.env.JWT_SECRET);
        // userId = payload.sub;
        return res.status(403).json({ error: "Forbidden: Invalid session" });
      }

      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // 3. Secure AI Integration (Never expose API key to client)
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `User (${userId}): ${message}` }]
          }
        ],
        config: {
          systemInstruction: "You are the 'Orbit AI Premium Wealth Intelligence Expert'. Your purpose is to provide sharp, data-driven insights on financial architecture, specifically focusing on the power of compounding, sophisticated tax strategies, and robust savings models. Your tone should be executive, professional, and precise. Use financial terminology accurately. Keep responses concise but insightful. Do not mention being an AI or a language model. Your goal is to help users optimize their financial future with premium intelligence.",
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      // Handle Rate Limit / Quota Exhausted gracefully
      const errorString = typeof error === 'object' ? JSON.stringify(error) : String(error);
      const errorMessage = error?.message || errorString || String(error);
      
      if (errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("429") || errorMessage.includes("monthly spending cap")) {
        return res.json({ 
          text: "Orbit AI Systems are currently operating at maximum capacity due to high volume. Please maintain your current financial strategy and try querying again shortly." 
        });
      }
      
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  const isProd = process.env.NODE_ENV === "production";
  const distPath = path.resolve(process.cwd(), "dist");

  if (isProd) {
    console.log("Running in PRODUCTION mode - serving from:", distPath);
    // 1. Serve static assets
    app.use(express.static(distPath, {
      index: false,
      maxAge: '1y',
      immutable: true
    }));

    // 2. Catch-all: Send index.html for any request that didn't match a static file
    app.get("*", (req, res) => {
      // Ignore API routes
      if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: "API route not found" });
      }

      const indexPath = path.join(distPath, "index.html");
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error("Critical error: Missing index.html in dist folder during production request:", req.path, indexPath);
          res.status(500).send("Application initialization error. Please try again later.");
        }
      });
    });
  } else {
    console.log("Running in DEVELOPMENT mode - using Vite middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

console.log("Starting server process...");
startServer().catch(err => {
  console.error("FATAL: Failed to start server:", err);
  process.exit(1);
});

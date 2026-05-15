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

  // AI Chat Route with Security Fixes
  // Address Vercel warning: missing authorization checks and user impersonation
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
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `User (${userId}): ${message}` }]
          }
        ],
        config: {
          systemInstruction: "You are a secure financial advisor assistant for Orbit Wealth Pro. Provide concise, expert advice based on global financial standards.",
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  const isProd = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod";
  const distPath = path.resolve(process.cwd(), "dist");

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the dist directory
    app.use(express.static(distPath));

    // Handle all other routes by serving index.html (Catch-all for SPA deep links)
    app.get("*", (req, res) => {
      // Ensure we don't accidentally catch static assets that might be 404ing (avoid infinite loops of index.html)
      if (req.path.includes('.') || req.path.startsWith('/assets/')) {
        return res.status(404).send('Not found');
      }
      res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) {
          console.error("Error sending index.html:", err);
          res.status(500).send("Server Error: Unable to serve index.html");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(
    "/api/analyze",
    createProxyMiddleware({
      target: "https://us-central1-chaerok-c0830.cloudfunctions.net",
      changeOrigin: true,
      pathRewrite: { "^/api/analyze": "/analyze" },
      secure: true,
    })
  );

  app.use(
    "/api/whois",
    createProxyMiddleware({
      target: "https://us-central1-chaerok-c0830.cloudfunctions.net",
      changeOrigin: true,
      pathRewrite: { "^/api/whois": "/whois" },
      secure: true,
    })
  );

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

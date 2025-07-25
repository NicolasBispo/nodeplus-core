// server.tsx
import express from "express";
import { createServer as createHttpServer } from "http";
import { getRouter, router } from "./Router";
import path from "path";
import fs from "fs";

export async function startServer(port: number = 3000) {
  const app = express();
  const server = createHttpServer(app);

  const isProd = process.env.NODE_ENV === 'production';

  let vite: any;

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      root: path.join(__dirname, '../../src/client'),
      optimizeDeps: {
        include: ['react', 'react-dom']
      }
    });
    app.use(vite.middlewares);
  } else {
    app.use('/dist', express.static(path.join(__dirname, '../../public/dist')));
    app.use('/assets', express.static(path.join(__dirname, '../../public/assets')));
  }

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  // Register routes
  const routes = getRouter().getRoutes();
  routes.forEach((route) => {
    const method = route.method.toLowerCase() as keyof express.Application;
    if (typeof app[method] === 'function') {
      (app[method] as any)(route.path, route.handler);
    }
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).send(`
      <h1>404 - Not Found</h1>
      <p>The route ${req.method} ${req.url} was not found.</p>
    `);
  });

  // Error handler
  app.use((error: any, req: express.Request, res: express.Response, next: any) => {
    console.error('Server error:', error);
    res.status(500).send(`
      <h1>500 - Internal Server Error</h1>
      <p>Something went wrong on the server.</p>
    `);
  });

  server.listen(port, () => {
    console.log(`🚀 NodePlus Framework server running on port ${port}`);
    console.log(`📱 Visit: http://localhost:${port}`);
    console.log(`📋 Available routes:`);
    routes.forEach((route) => {
      console.log(`   ${route.method} ${route.path} → ${route.action}`);
    });
  });

  return server;
}

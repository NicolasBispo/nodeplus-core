import 'reflect-metadata'
import express from "express";
import { setupRoutes } from "./config/routes";
import { errorMiddleware } from "nodeplus-core/node-plus-server";
import { createServer } from "vite";
import path from "path";
import app from 'app/app';

async function startServer() {
  const app = express();
  const vite = await createServer({
    server: {
      middlewareMode: true,
    },
  });

  console.log('Iniciando servidor vite com middleware')

  // Middleware para parsing JSON
  app.use(express.json());

  // Servir arquivos estáticos
  app.use("/static", express.static(path.join(__dirname, "../../static")));

  // Servir arquivos estáticos do app (CSS, JS, etc.)
  app.use("/src", express.static(path.join(__dirname, "../app")));

  // Middleware para suportar PUT/DELETE via POST com _method
  app.use((req, res, next) => {
    if (req.body && req.body._method) {
      req.method = req.body._method.toUpperCase();
      delete req.body._method;
    }
    next();
  });

  // Middleware para parsing form data
  app.use(express.urlencoded({ extended: true }));

  // Setup routes using decorators - IMPORTANTE: antes do middleware do Vite
  app.use(setupRoutes());

  // Middleware do Vite APÓS as rotas do Express
  app.use(vite.middlewares);
  console.log('Servidor vite com middleware iniciado')

  // Error handling middleware
  app.use(errorMiddleware);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📖 Available routes:`);
    console.log(`   GET  /`);
    console.log(`   GET  /about`);
    console.log(`   POST /contact`);
    console.log(`   GET  /users`);
    console.log(`   GET  /users/:id`);
    console.log(`   POST /users`);
    console.log(`   PUT  /users/:id`);
    console.log(`   DELETE /users/:id`);
  });

}

startServer();
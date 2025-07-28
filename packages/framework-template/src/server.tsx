import 'reflect-metadata'
import express from "express";
import { setupRoutes } from "./config/routes";
import { errorMiddleware, setupDefaultHydration, hydrationMiddleware } from "nodeplus-core/node-plus-server";
import { createServer } from "vite";
import path from "path";
import fs from "fs";
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
  
  // Servir arquivos TypeScript/TSX para hydration
  app.use("/app", express.static(path.join(__dirname, "../app")));
  
  // Middleware específico para servir arquivos TSX compilados
  app.get("/app/pages/:file", async (req, res, next) => {
    const filePath = path.join(__dirname, "app/pages", req.params.file);
    console.log(`🔍 [Server] Tentando servir: ${filePath}`);
    
    if (fs.existsSync(filePath)) {
      console.log(`✅ [Server] Arquivo encontrado: ${filePath}`);
      
      try {
        // Ler o arquivo TSX
        const tsxContent = fs.readFileSync(filePath, 'utf8');
        
        // Compilar TypeScript para JavaScript usando SWC
        const { transform } = await import('@swc/core');
        const result = await transform(tsxContent, {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
                development: true,
              },
            },
            target: 'es2022',
          },
          module: {
            type: 'es6',
            strict: false,
            strictMode: true,
            lazy: false,
            noInterop: false,
          },
          sourceMaps: false,
          minify: false,
        });
        
        // Substituir imports relativos por absolutos
        let compiledCode = result.code;
        compiledCode = compiledCode.replace(/from ['"]react['"]/g, 'from "https://esm.sh/react@19.1.0"');
        compiledCode = compiledCode.replace(/from ['"]react-dom\/client['"]/g, 'from "https://esm.sh/react-dom@19.1.0/client"');
        compiledCode = compiledCode.replace(/from ['"]react\/jsx-dev-runtime['"]/g, 'from "https://esm.sh/react@19.1.0/jsx-dev-runtime"');
        compiledCode = compiledCode.replace(/from ['"]react\/jsx-runtime['"]/g, 'from "https://esm.sh/react@19.1.0/jsx-runtime"');
        
        // Configurar headers para módulo ES6
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'no-cache');
        
        // Enviar o JavaScript compilado
        res.send(compiledCode);
        
      } catch (error) {
        console.error('❌ [Server] Erro ao compilar TSX:', error);
        res.status(500).send('Erro ao compilar TSX');
      }
    } else {
      console.log(`❌ [Server] Arquivo não encontrado: ${filePath}`);
      next();
    }
  });

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

  // Configurar sistema de hydration do core
  setupDefaultHydration(app);
  app.use(hydrationMiddleware);

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
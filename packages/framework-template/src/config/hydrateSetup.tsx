import express from 'express';
import path from 'path';
import fs from 'fs';
import { transform } from '@swc/core';

/**
 * Função que carrega o arquivo index.html e registra a rota específica para main.tsx
 * @param app - Instância do Express
 */
export function setupMainHydrationRoute(app: express.Application): void {
  // Carregar o arquivo index.html
  const indexPath = path.join(__dirname, '../app/index.html');
  let indexHtml: string;

  try {
    indexHtml = fs.readFileSync(indexPath, 'utf8');
    console.log('✅ [Hydrate] Index.html carregado com sucesso');
  } catch (error) {
    console.error('❌ [Hydrate] Erro ao carregar index.html:', error);
    throw new Error('Não foi possível carregar o arquivo index.html');
  }

  // Rota específica para servir main.tsx compilado
  app.get('/scripts/app', async (req: express.Request, res: express.Response) => {
    console.log('📁 [Hydrate] Compilando e servindo main.tsx');
    
    try {
      // Ler o arquivo main.tsx
      const mainTsxPath = path.join(__dirname, '../scripts/hydrate.tsx');
      const mainTsxContent = fs.readFileSync(mainTsxPath, 'utf8');
      
      // Compilar TypeScript para JavaScript usando SWC
      const result = await transform(mainTsxContent, {
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
      
      // Configurar headers para módulo ES6
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'no-cache');
      
      // Enviar o JavaScript compilado
      res.send(result.code);
      
    } catch (error) {
      console.error('❌ [Hydrate] Erro ao compilar main.tsx:', error);
      res.status(500).send('Erro ao compilar main.tsx');
    }
  });

  console.log('✅ [Hydrate] Rota /scripts/app configurada (compilação SWC)');
}
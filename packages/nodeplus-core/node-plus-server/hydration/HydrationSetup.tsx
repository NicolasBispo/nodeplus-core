import express from 'express';
import path from 'path';
import fs from 'fs';
import { transform } from '@swc/core';

interface HydrationConfig {
  indexPath?: string;
  routePath?: string;
  pagesDirectory?: string;
}

/**
 * Configura o sistema de hydration para o NodePlus framework
 * @param app - Instância do Express
 * @param config - Configuração opcional do sistema de hydration
 */
export function setupHydration(app: express.Application, config: HydrationConfig = {}): void {
  const {
    indexPath = path.join(process.cwd(), 'src/app/index.html'),
    routePath = '/scripts/hydration',
    pagesDirectory = '../app/pages'
  } = config;

  // Carregar o arquivo index.html
  let indexHtml: string;

  try {
    indexHtml = fs.readFileSync(indexPath, 'utf8');
    console.log('✅ [NodePlus Hydration] Index.html carregado com sucesso');
  } catch (error) {
    console.error('❌ [NodePlus Hydration] Erro ao carregar index.html:', error);
    throw new Error('Não foi possível carregar o arquivo index.html');
  }

  // Rota específica para servir o script de hydration compilado
  app.get(routePath, async (req: express.Request, res: express.Response) => {
    console.log('📁 [NodePlus Hydration] Servindo script de hydration');
    
    try {
      // Script de hydration embutido
      const scriptContent = `
import React from 'react'
import { hydrateRoot } from 'react-dom/client'

// Wrapper component to ensure proper React context
function HydrationWrapper({ Component, componentProps }) {
  return React.createElement(Component, componentProps)
}

async function hydrate() {
  // Get hydration data from window object
  const hydrationData = window.__HYDRATION_DATA__ || {}
  const { props = {}, componentName = '' } = hydrationData

  if (!componentName) {
    console.error('[NodePlus Hydration] Component name is empty')
    return
  }
  
  try {
    // Import the component module using dynamic import
    const module = await import(\`/app/pages/\${componentName}.tsx\`)
    const Component = module.default
    
    // Ensure we have a valid React component
    if (!Component || typeof Component !== 'function') {
      throw new Error(\`Invalid component: \${componentName}\`)
    }
    
    // Get the root element
    const rootElement = document.getElementById('root')
    if (!rootElement) {
      throw new Error('Root element not found')
    }
    
    // Create the wrapper element and hydrate
    const element = React.createElement(HydrationWrapper, { Component, componentProps: props })
    hydrateRoot(rootElement, element)
    
    console.log(\`✅ [NodePlus Hydration] Component \${componentName} hydrated successfully\`)
  } catch (error) {
    console.error(\`[NodePlus Hydration] Error loading component \${componentName}:\`, error)
  }
}

// Start hydration
hydrate().catch(err => {
  console.error('[NodePlus Hydration] Error during hydration:', err)
})
      `;
      
      // Compilar TypeScript para JavaScript usando SWC
      const result = await transform(scriptContent, {
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
      console.error('❌ [NodePlus Hydration] Erro ao compilar script de hydration:', error);
      res.status(500).send('Erro ao compilar script de hydration');
    }
  });

  console.log(`✅ [NodePlus Hydration] Rota ${routePath} configurada (compilação SWC)`);
}

/**
 * Gera o HTML com os dados de hydration
 * @param componentName - Nome do componente a ser hidratado
 * @param props - Props do componente
 * @param templateHtml - HTML template base
 * @returns HTML com dados de hydration
 */
export function generateHydrationHTML(
  componentName: string, 
  props: any = {}, 
  templateHtml: string
): string {
  const hydrationData = {
    componentName,
    props
  };

  // Injetar dados de hydration no HTML
  const hydrationScript = `
    <script>
      window.__HYDRATION_DATA__ = ${JSON.stringify(hydrationData)};
    </script>
    <script type="module" src="/scripts/hydration"></script>
  `;

  // Inserir scripts antes do fechamento do </body>
  return templateHtml.replace('</body>', `${hydrationScript}\n</body>`);
} 
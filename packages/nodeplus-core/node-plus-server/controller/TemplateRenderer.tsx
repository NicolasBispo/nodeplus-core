import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Readable, PassThrough } from "stream";

interface SEOProperties {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export class TemplateRenderer {
  static async renderToStream(
    Component: React.ComponentType<any>, 
    componentProps?: any, 
    seoProperties?: SEOProperties
  ): Promise<Readable> {
    const componentName = Component.name || 'Component';
    console.log(`🔄 [TemplateRenderer] Renderizando componente: ${componentName}`);
    
    return new Promise((resolve, reject) => {
      let didError = false;

      const { pipe, abort } = renderToPipeableStream(
        React.createElement(Component, componentProps),
        {
          onShellReady() {
            // Criar um PassThrough stream para combinar template e conteúdo React
            const outputStream = new PassThrough();
            
            // Criar o HTML completo dinamicamente
            const html = TemplateRenderer.createCompleteHTML(componentProps, componentName, seoProperties);
            
            // Enviar o HTML completo
            outputStream.write(html);
            outputStream.end();
            resolve(outputStream);
          },
          onError(error: unknown) {
            didError = true;
            console.error('Erro no renderToPipeableStream:', error);
            reject(error instanceof Error ? error : new Error(String(error)));
          },
          onAllReady() {
            console.log(`✅ [TemplateRenderer] Componente ${componentName} renderizado com sucesso`);
          }
        }
      );

      // Timeout para evitar que o stream fique pendente indefinidamente
      setTimeout(() => {
        abort();
        reject(new Error('Timeout no renderToPipeableStream'));
      }, 10000);
    });
  }

  // Método para renderização síncrona (fallback)
  static async render(
    Component: React.ComponentType<any>, 
    seoProperties?: SEOProperties, 
    componentProps?: any
  ): Promise<string> {
    const componentName = Component.name || 'Component';
    console.log(`🔄 [TemplateRenderer] Renderizando componente: ${componentName}`);
    
    // Para renderização síncrona, vamos usar renderToString como fallback
    const { renderToString } = await import('react-dom/server');
    const html = renderToString(React.createElement(Component, componentProps));
    
    // Criar o HTML completo dinamicamente
    const result = TemplateRenderer.createCompleteHTML(componentProps, componentName, seoProperties, html);

    return result;
  }

  private static createCompleteHTML(
    componentProps?: any, 
    componentName?: string, 
    seoProperties?: SEOProperties,
    reactContent?: string
  ): string {
    // Serializar props para hydration
    const serializedProps = componentProps ? JSON.stringify(componentProps) : 'null';
    
    // Criar o HTML base
    let html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${seoProperties?.title || 'NodePlus App'}</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.3.1",
        "react-dom/client": "https://esm.sh/react-dom@18.3.1/client"
      }
    }
    </script>
    <script>
      window.__INITIAL_PROPS__ = ${serializedProps};
      window.__COMPONENT_NAME__ = "${componentName || 'Component'}";
    </script>`;

    // Adicionar meta tags SEO se especificadas
    if (seoProperties) {
      html += `
    <meta name="description" content="${seoProperties.description || ''}">
    <meta name="keywords" content="${seoProperties.keywords || ''}">`;
      
      if (seoProperties.ogTitle) {
        html += `
    <meta property="og:title" content="${seoProperties.ogTitle}">`;
      }
      
      if (seoProperties.ogDescription) {
        html += `
    <meta property="og:description" content="${seoProperties.ogDescription}">`;
      }
      
      if (seoProperties.ogImage) {
        html += `
    <meta property="og:image" content="${seoProperties.ogImage}">`;
      }
      
      if (seoProperties.canonical) {
        html += `
    <link rel="canonical" href="${seoProperties.canonical}">`;
      }
    }

    // Fechar head e abrir body
    html += `
  </head>
  <body>
    <div id="root">`;

    // Adicionar conteúdo React se fornecido
    if (reactContent) {
      html += reactContent;
    }

    // Fechar div e adicionar script de hydration
    html += `
    </div>
    <script type="module" src="/src/scripts/hydrate.tsx"></script>
  </body>
</html>`;

    return html;
  }
} 
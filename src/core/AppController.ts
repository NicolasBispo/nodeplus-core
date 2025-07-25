import * as React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { getComponentForPath } from './routesMap';
import path from 'path';
import fs from 'fs';

import { Request, Response } from './types';

export abstract class AppController {
  protected req: Request;
  protected res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  /**
   * Render a React component with props
   * @param Component - React component to render
   * @param pageProps - Props to pass to the component
   * @returns HTML string
   */
  protected renderView(Component: React.ComponentType<any>, pageProps: any = {}): string {
    try {
      // Render the component directly wrapped in the app div for hydration consistency
      const html = renderToString(
        React.createElement('div', { className: 'app' },
          React.createElement(Component, pageProps)
        )
      );
      
      return this.buildHtml(html, pageProps);
    } catch (error) {
      console.error('Error rendering view:', error);
      return '<h1>Erro ao renderizar a página</h1>';
    }
  }

  /**
   * Render a route dynamically based on the current path
   * @param pageProps - Props to pass to the component
   * @returns HTML string
   */
  protected renderRoute(pageProps: any = {}): string {
    try {
      const path = this.req.path;
      const Component = getComponentForPath(path);
      
      if (!Component) {
        return '<h1>Página não encontrada</h1>';
      }

      // Render the component directly wrapped in the app div for hydration consistency
      const html = renderToString(
        React.createElement('div', { className: 'app' },
          React.createElement(Component, pageProps)
        )
      );
      return this.buildHtml(html, pageProps);
    } catch (error) {
      console.error('Error rendering route:', error);
      return '<h1>Erro ao renderizar a página</h1>';
    }
  }

  /**
   * Build the complete HTML document
   * @param html - Rendered component HTML
   * @param pageProps - Props to inject into window.__INITIAL_PROPS__
   * @returns Complete HTML document
   */
  private buildHtml(html: string, pageProps: any = {}): string {
    const isDev = process.env.NODE_ENV !== 'production';
    let clientScripts = '';
    
    if (isDev) {
      // Em desenvolvimento, usar os scripts do Vite
      clientScripts = `
        <script type="module" src="/@vite/client"></script>
        <script type="module" src="/main.tsx"></script>
      `;
    } else {
      // Em produção, usar o manifest
      try {
        const manifestPath = path.join(__dirname, '../../public/dist/manifest.json');
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
          const mainEntry = manifest['main.tsx'];
          if (mainEntry && mainEntry.file) {
            clientScripts = `<script type="module" src="/dist/${mainEntry.file}"></script>`;
          } else {
            clientScripts = '<script type="module" src="/dist/main.js"></script>';
          }
        } else {
          clientScripts = '<script type="module" src="/dist/main.js"></script>';
        }
      } catch (error) {
        console.warn('Could not load manifest.json, using fallback:', error);
        clientScripts = '<script type="module" src="/dist/main.js"></script>';
      }
    }
    
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>NodePlus Framework</title>
        </head>
        <body>
          <div id="app">${html}</div>
          <script>
            window.__INITIAL_PROPS__ = ${JSON.stringify(pageProps)};
          </script>
          ${clientScripts}
        </body>
      </html>
    `;
  }

  /**
   * Redirect to another URL
   */
  protected redirect(path: string): void {
    this.res.redirect(path);
  }

  /**
   * Return JSON response
   */
  protected json(data: any): void {
    this.res.json(data);
  }

  /**
   * Get request parameters
   */
  protected get params() {
    return this.req.params;
  }

  /**
   * Get request body
   */
  protected get body() {
    return this.req.body;
  }

  /**
   * Get query parameters
   */
  protected get query() {
    return this.req.query;
  }
} 
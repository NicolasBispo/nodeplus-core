import express from 'express';
import { Request, Response } from './types';

// Router with Rails-like DSL
export class Router {
  private routes: Array<{
    method: string;
    path: string;
    action: string;
    handler: (req: Request, res: Response) => Promise<void>;
  }> = [];

  get(path: string, action: string) {
    this.addRoute('GET', path, action);
  }

  post(path: string, action: string) {
    this.addRoute('POST', path, action);
  }

  put(path: string, action: string) {
    this.addRoute('PUT', path, action);
  }

  delete(path: string, action: string) {
    this.addRoute('DELETE', path, action);
  }

  private addRoute(method: string, path: string, action: string) {
    this.routes.push({
      method,
      path,
      action,
      handler: this.buildHandler(action)
    });
  }

  private buildHandler(actionString: string) {
    return async (req: Request, res: Response) => {
      try {
        const [controllerName, method] = actionString.split('.');
        
        // Try to import from the application's controllers directory
        let controllerModule;
        try {
          // First try the relative path from the application
          controllerModule = await import(`../controllers/${controllerName}`);
        } catch (error) {
          try {
            // Fallback to absolute path
            controllerModule = await import(`../../controllers/${controllerName}`);
          } catch (fallbackError) {
            // Last resort: try to import from the current working directory
            const path = require('path');
            const controllerPath = path.join(process.cwd(), 'src', 'controllers', controllerName);
            controllerModule = await import(controllerPath);
          }
        }
        
        const ControllerClass = controllerModule[controllerName];
        
        if (!ControllerClass) {
          throw new Error(`Controller ${controllerName} not found`);
        }

        const controller = new ControllerClass(req, res);
        
        if (typeof controller[method] !== 'function') {
          throw new Error(`Method ${method} not found in ${controllerName}`);
        }

        const result = await controller[method]();
        
        if (typeof result === 'string') {
          res.setHeader('Content-Type', 'text/html');
          res.send(result);
        } else if (result !== undefined) {
          res.json(result);
        }
      } catch (error) {
        console.error('Controller error:', error);
        res.status(500).send('Internal Server Error');
      }
    };
  }

  getRoutes() {
    return this.routes;
  }
}

// Create and export a router instance
export const router = new Router();

// Function to get the global router instance
export function getRouter(): Router {
  return router;
} 
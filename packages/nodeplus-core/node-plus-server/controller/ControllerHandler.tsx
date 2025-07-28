import { Request, Response, NextFunction } from "express";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { BaseAppController } from "./BaseAppController";
import { extractArgs } from "../requests/Decorators";
import { TemplateRenderer } from "./TemplateRenderer";

export function controllerHandler(
  controllerClass: new (req: Request, res: Response) => BaseAppController,
  methodName: string
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!controllerClass || !methodName) {
        return res.status(404).json({ error: "Not found" });
      }

      // Create controller instance
      const controller = new controllerClass(req, res);
      
      // Extract arguments using decorators
      const args = extractArgs(controller, methodName, req, res, next);
      
      // Call the method with extracted arguments
      const result = await controller[methodName](...args);

      // 🎯 ControllerHandler decide o tipo de resposta baseado no resultado

      // 1. Se for undefined/null, retorna 204 No Content
      if (result === undefined || result === null) {
        return res.status(204).end();
      }

      // 2. Se for string e contém HTML, retorna como HTML
      if (typeof result === 'string' && result.includes('<!DOCTYPE html>')) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.send(result);
      }

      // 3. Se for React element, renderiza com template usando streaming
      if (React.isValidElement(result)) {
        console.log('É elemento react sendo renderizado')
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        
        try {
          const props = result.props && typeof result.props === 'object' ? result.props : {};
          const componentType = result.type as React.ComponentType<any>;
          const componentName = componentType.name || componentType.displayName || 'Component';
          
          const stream = await TemplateRenderer.renderToStream(
            componentType, 
            { ...props, initialData: props }, 
            (controller as any).seoProperties,
            componentName
          );
            console.log('renderizando como stream')
          return stream.pipe(res);
        } catch (error) {
          console.error('Erro no streaming, fallback para render síncrono:', error);
          // Fallback para renderização síncrona
          const props = result.props && typeof result.props === 'object' ? result.props : {};
          const componentType = result.type as React.ComponentType<any>;
          const componentName = componentType.name || componentType.displayName || 'Component';
          
          const html = await TemplateRenderer.render(
            componentType, 
            (controller as any).seoProperties, 
            { ...props, initialData: props },
            componentName
          );
          return res.send(html);
        }
      }

      // 4. Se for objeto com redirect, faz redirect
      if (typeof result === 'object' && result !== null && 'redirect' in result) {
        return res.redirect(result.redirect);
      }

      // 5. Se for objeto com status, retorna com status específico
      if (typeof result === 'object' && result !== null && 'status' in result) {
        const status = result.status;
        delete result.status;
        return res.status(status).json(result);
      }

      // 6. Se for objeto com data, retorna JSON
      if (typeof result === 'object' && result !== null && 'data' in result) {
        return res.json(result.data);
      }

      // 7. Se for qualquer outro objeto, retorna como JSON
      if (typeof result === 'object' && result !== null) {
        return res.json(result);
      }

      // 8. Se for string simples, retorna como texto
      if (typeof result === 'string') {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.send(result);
      }

      // 9. Fallback: retorna como JSON
      return res.json(result);

    } catch (err) {
      next(err);
    }
  };
}

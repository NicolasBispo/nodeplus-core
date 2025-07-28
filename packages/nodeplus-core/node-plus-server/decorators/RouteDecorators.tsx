import "reflect-metadata";
import { Router } from "express";
import { controllerHandler } from "../controller/ControllerHandler";

const ROUTES_METADATA = Symbol("routes");
const CONTROLLER_METADATA = Symbol("controller");

export interface RouteMetadata {
  method: string;
  path: string;
  handler: string | symbol;
}

export interface ControllerMetadata {
  basePath: string;
  routes: RouteMetadata[];
}

function createRouteDecorator(method: string) {
  return (path: string = "") => {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
      const existingRoutes: RouteMetadata[] = 
        Reflect.getOwnMetadata(ROUTES_METADATA, target.constructor) || [];
      
      existingRoutes.push({
        method: method.toLowerCase(),
        path,
        handler: propertyKey
      });

      Reflect.defineMetadata(ROUTES_METADATA, existingRoutes, target.constructor);
      
      // Preserva o método original
      const originalMethod = descriptor.value;
      descriptor.value = function(...args: any[]) {
        return originalMethod.apply(this, args);
      };
      
      return descriptor;
    };
  };
}

export const Get = createRouteDecorator("GET");
export const Post = createRouteDecorator("POST");
export const Put = createRouteDecorator("PUT");
export const Patch = createRouteDecorator("PATCH");
export const Delete = createRouteDecorator("DELETE");

export function Controller(basePath: string = "") {
  return function (target: any) {
    Reflect.defineMetadata(CONTROLLER_METADATA, { basePath }, target);
  };
}

export function getControllerMetadata(target: any): ControllerMetadata | undefined {
  return Reflect.getOwnMetadata(CONTROLLER_METADATA, target);
}

export function getRoutesMetadata(target: any): RouteMetadata[] {
  return Reflect.getOwnMetadata(ROUTES_METADATA, target) || [];
}

export function registerControllerRoutes(controllerClass: any, router: Router = Router()): Router {
  const controllerMetadata = getControllerMetadata(controllerClass);
  const routesMetadata = getRoutesMetadata(controllerClass);
  
  const basePath = controllerMetadata?.basePath || "";
  
  routesMetadata.forEach(route => {
    // Corrigir duplicação de barras
    let fullPath = basePath + route.path;
    if (basePath.endsWith('/') && route.path.startsWith('/')) {
      fullPath = basePath + route.path.substring(1);
    }
    
    const handler = controllerHandler(controllerClass, route.handler as string);
    
    switch (route.method) {
      case "get":
        router.get(fullPath, handler);
        break;
      case "post":
        router.post(fullPath, handler);
        break;
      case "put":
        router.put(fullPath, handler);
        break;
      case "patch":
        router.patch(fullPath, handler);
        break;
      case "delete":
        router.delete(fullPath, handler);
        break;
    }
  });
  
  return router;
} 
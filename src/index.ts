// Core exports
export { AppController } from './core/AppController';
export { Router, router, getRouter } from './core/Router';
export { startServer } from './core/Server';
export { routesMap, getComponentForPath, registerRoute, type RouteConfig } from './core/routesMap';

// Types
export type { Request, Response, Route } from './core/types';

// Framework initialization
export { createApp, createNodePlusApp } from './utils/createApp'; 
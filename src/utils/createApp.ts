import { startServer } from '../core/Server';
import { Router } from '../core/Router';

export interface AppConfig {
  port?: number;
  routes?: () => void;
  middleware?: any[];
}

export function createApp(config: AppConfig = {}) {
  const { port = 3000, routes, middleware = [] } = config;

  // Initialize router if routes are provided
  if (routes) {
    routes();
  }

  // Start the server
  return startServer(port);
}

// Convenience function for quick setup
export function createNodePlusApp(routes: () => void, port: number = 3000) {
  return createApp({ routes, port });
} 
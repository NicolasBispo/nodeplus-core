import React from 'react';

// These will be provided by the application using the framework
// The framework should not depend on specific components
export interface RouteConfig {
  component: React.ComponentType<any>;
  path: string;
}

export const routesMap: Record<string, RouteConfig> = {};

export function getComponentForPath(path: string): React.ComponentType<any> | null {
  const route = routesMap[path];
  return route ? route.component : null;
}

// Function to register routes from the application
export function registerRoute(path: string, component: React.ComponentType<any>) {
  routesMap[path] = {
    component,
    path
  };
} 
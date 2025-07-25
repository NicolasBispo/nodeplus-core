import express from 'express';

export interface Request extends express.Request {
  // Additional properties can be added here
}

export interface Response extends express.Response {
  // Additional properties can be added here
}

export interface Route {
  method: string;
  path: string;
  action: string;
  handler: (req: Request, res: Response) => void;
}

export interface RouteConfig {
  component: React.ComponentType<any>;
  path: string;
} 
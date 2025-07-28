import { Router } from "express";
import { registerControllerRoutes } from "nodeplus-core/node-plus-server";
import HomeController from "../controllers/HomeController";
import UserController from "../controllers/UserController";

export function setupRoutes(): Router {
  const router = Router();
  
  // Register controllers using decorators - ControllerHandler is applied automatically
  registerControllerRoutes(HomeController, router);
  registerControllerRoutes(UserController, router);
  
  return router;
}
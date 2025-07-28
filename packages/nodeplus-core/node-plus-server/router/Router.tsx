import express,{NextFunction, Request, Response, Router} from "express";
import NotFound from "../default-pages/NotFound";
import { registerControllerRoutes } from "../decorators/RouteDecorators";
import { controllerHandler } from "../controller/ControllerHandler";

type ControllerMethod = (req: Request, res: Response, next: NextFunction) => any;

interface ResourceController {
  index?: ControllerMethod;
  show?: ControllerMethod;
  create?: ControllerMethod;
  update?: ControllerMethod;
  destroy?: ControllerMethod;
}

function resources(
  resourceName: string,
  controller: ResourceController,
  router: Router = express.Router()
){
  const basePath = `/${resourceName}`;

  if (controller.index) {
    router.get(basePath, controller.index);
  }

  if (controller.show) {
    router.get(`${basePath}/:id`, controller.show);
  }

  if (controller.create) {
    router.post(basePath, controller.create);
  }

  if (controller.update) {
    router.put(`${basePath}/:id`, controller.update);
  } 
}

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  return <NotFound />
}

export {
  resources
}

export function registerHydratorFile(){
  
}
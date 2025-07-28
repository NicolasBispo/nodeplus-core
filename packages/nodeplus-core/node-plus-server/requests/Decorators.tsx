import "reflect-metadata";
import { Request, Response, NextFunction } from "express";

const ROUTE_ARGS_METADATA = Symbol("routeArgs");

type ParamType = "body" | "query" | "param" | "headers" | "request" | "response" | "next";

interface ParamMetadata {
  index: number;
  type: ParamType;
  key?: string;
}

function createParamDecorator(type: ParamType) {
  return function (key?: string) {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
      const existingParams: ParamMetadata[] =
        Reflect.getOwnMetadata(ROUTE_ARGS_METADATA, target, propertyKey) || [];

      existingParams.push({ index: parameterIndex, type, key });

      Reflect.defineMetadata(ROUTE_ARGS_METADATA, existingParams, target, propertyKey);
    };
  };
}

export const Body = createParamDecorator("body");
export const Query = (key?: string) => createParamDecorator("query")(key);
export const Param = (key?: string) => createParamDecorator("param")(key);
export const Headers = (key?: string) => createParamDecorator("headers")(key);
export const Req = createParamDecorator("request");
export const Res = createParamDecorator("response");
export const Next = createParamDecorator("next");

export function extractArgs(target: any, propertyKey: string, req: Request, res: Response, next: NextFunction): any[] {
  // Buscar metadados no prototype da classe
  const controllerClass = target.constructor;
  const params: ParamMetadata[] = Reflect.getOwnMetadata(ROUTE_ARGS_METADATA, controllerClass.prototype, propertyKey) || [];
  const args = [];

  for (const param of params) {
    switch (param.type) {
      case "body":
        args[param.index] = req.body;
        break;
      case "query":
        args[param.index] = param.key ? req.query[param.key] : req.query;
        break;
      case "param":
        args[param.index] = param.key ? req.params[param.key] : req.params;
        break;
      case "headers":
        args[param.index] = param.key ? req.headers[param.key.toLowerCase()] : req.headers;
        break;
      case "request":
        args[param.index] = req;
        break;
      case "response":
        args[param.index] = res;
        break;
      case "next":
        args[param.index] = next;
        break;
      default:
        args[param.index] = undefined;
    }
  }

  return args;
}

import { plural } from "pluralize"
import {kebabCase} from 'lodash'
export function controllerName(controller: new (...args: any[]) => any){
  return plural(controller.name.toLowerCase());
}


export function getControllerFileByName(controllerName: string){
  const controllerParsedName = kebabCase(controllerName)
  return controllerParsedName
}

export function getControllerPath(controllerParsedName: string){
  return `@/controllers/${controllerParsedName}`
}
import { Request, Response } from "express";
import { extractArgs } from "../requests/Decorators";
import React from "react";

interface SEOProperties {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export class BaseAppController {
  protected req: Request;
  protected res: Response;
  protected seoProperties: SEOProperties = {};

  [key: string]: any;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  protected setSEO(properties: SEOProperties) {
    this.seoProperties = { ...this.seoProperties, ...properties };
  }

  protected redirect(path: string) {
    return this.res.redirect(path);
  }

  protected extractArgs(methodName: string) {
    return extractArgs(this, methodName, this.req, this.res, () => {});
  }
}


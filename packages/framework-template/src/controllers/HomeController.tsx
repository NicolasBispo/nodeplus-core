import { Body, Controller, Get, Post } from "nodeplus-core/node-plus-server";
import ApplicationController from "./ApplicationController";
import Home from "../app/pages/Home";
import About from "../app/pages/About";

@Controller("/")
export default class HomeController extends ApplicationController {

  @Get("/")
  async index() {
    // Definir SEO properties
    this.setSEO({
      title: "Home - NodePlus web kkk",
      description: "Welcome to NodePlus - Modern MVC framework with JSX rendering",
      keywords: "nodejs, express, react, jsx, mvc, typescript, framework",
    });

    // Retornar a view Home
    return <Home initialData={{ name: "NodePlus" }} />;
  }

  @Get("/about")
  async about() {
    // Definir SEO properties
    this.setSEO({
      title: "About - NodePlus",
      description: "Learn about NodePlus - A powerful MVC framework that combines Express.js with React JSX rendering",
      keywords: "about, nodeplus, framework, express, react, jsx, typescript"
    });

    // Retornar a view About
    return <About />;
  }

  @Post("/contact")
  async contact(@Body() body: any) {
    // Retornar objeto com redirect
    return { redirect: "/?message=Contact form submitted successfully" };
  }
}

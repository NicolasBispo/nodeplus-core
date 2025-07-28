import {
  Body,
  Param,
  Query,
  Controller,
  Get,
  Post,
  Put,
  Delete,
} from "nodeplus-core/node-plus-server";
import ApplicationController from "./ApplicationController";
import Users from "../app/pages/Users";
import UserDetail from "../app/pages/UserDetail";

@Controller("/users")
export default class UserController extends ApplicationController {
  @Get("/")
  async index(@Query() query: any) {
    // Definir SEO properties
    this.setSEO({
      title: "Users - NodePlus",
      description: "Manage users in NodePlus application",
      keywords: "users, management, crud, nodeplus",
    });

    // Retornar a view Users
    return <Users />;
  }

  @Get("/:id")
  async show(@Param("id") id: string) {
    // Definir SEO properties
    this.setSEO({
      title: `User ${id} - NodePlus`,
      description: `View details for user ${id}`,
      keywords: `user, ${id}, details, nodeplus`,
    });

    const user = {
      id: parseInt(id),
      name: "User " + id,
      email: `user${id}@example.com`,
    };

    // Retornar a view UserDetail
    return <UserDetail user={user} />;
  }

  @Post("/")
  async create(@Body() body: any) {
    // In a real app, you would save to database here
    console.log("Creating user:", body);
    return { redirect: "/users?message=User created successfully" };
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() body: any) {
    // In a real app, you would update database here
    console.log("Updating user:", id, body);
    return { redirect: `/users/${id}?message=User updated successfully` };
  }

  @Delete("/:id")
  async destroy(@Param("id") id: string) {
    // In a real app, you would delete from database here
    console.log("Deleting user:", id);
    return { redirect: "/users?message=User deleted successfully" };
  }
}

import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { UserSchema, CreateUserBodySchema, GetUserByIdParamsSchema } from "./routes/user.js";
import { z } from "zod";
import { CreatePomodoroSessionSchema } from "./routes/pomodoro.js";

const registry = new OpenAPIRegistry();

// Register schemas
registry.register("User", UserSchema);
registry.register("CreateUserBody", CreateUserBodySchema);
registry.register("GetUserByIdParams", GetUserByIdParamsSchema);
registry.register("CreatePomodoroSessionSchema", CreatePomodoroSessionSchema);

registry.registerPath({
  method: "post",
  path: "/pomodoro",
  request: {
    body: {
      description: "Create a new pomodoro session",
      content: {
        "application/json": {
          schema: CreatePomodoroSessionSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Pomodoro session created",
      content: {
        "application/json": {
          schema: CreatePomodoroSessionSchema,
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

// Register routes
registry.registerPath({
  method: "get",
  path: "/user/{id}",
  request: {
    params: GetUserByIdParamsSchema,
  },
  responses: {
    200: {
      description: "Get user by ID",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/user",
  request: {
    body: {
      description: "Create a new user",
      content: {
        "application/json": {
          schema: CreateUserBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User created",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
  },
});

// Generate OpenAPI document
const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Pomodoro Pet API",
    version: "1.0.0",
  },
  // You can add servers, tags, etc. here
});
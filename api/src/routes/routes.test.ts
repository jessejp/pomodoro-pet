import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { createServer } from "../server.js";
import { Application } from "express";
import prisma from "../context/__mocks__/db.js";

vi.mock("../context/db.js");

const user = {
  id: "cmcvvy80f00003ujjmyboblol",
  name: "bob",
  isPublic: false,
};

// Helper to check for session cookie
function hasSessionCookie(response: request.Response, cookieName = "qid") {
  const cookies = response.headers["set-cookie"] ?? [];
  return (Array.isArray(cookies) ? cookies : [cookies]).some((cookie: string) =>
    cookie.startsWith(`${cookieName}=`)
  );
}

function getSessionCookie(response: request.Response, cookieName = "qid") {
  const cookies = response.headers["set-cookie"] ?? [];
  const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
  const sessionCookie = cookieArray.find((cookie: string) =>
    cookie.startsWith(`${cookieName}=`)
  );
  return sessionCookie ? sessionCookie.split(";")[0] : null;
}

describe("TEST Routes", () => {
  let app: Application;
  beforeEach(async () => {
    app = await createServer();
    prisma.user.findUnique.mockResolvedValue(user);
  });

  describe("GET /user", () => {
    it("should create a new user and return 201", async () => {
      prisma.user.create.mockResolvedValue(user);
      const response = await request(app).post("/user").send({ name: "bobby" });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(user.id);
      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe(user.name);
      expect(response.body).toHaveProperty("isPublic");
      expect(response.body.isPublic).toBe(user.isPublic);

      // check response session cookie 'qid'
      expect(hasSessionCookie(response)).toBe(true);
    });

    it("should return a user to non-authenticated user", async () => {
      prisma.user.findUnique.mockResolvedValue(user);

      const response = await request(app).get("/user/" + user.id);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(user.id);
      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBe(user.name);
      expect(hasSessionCookie(response)).toBe(false);
    });

    it("should return a list of users", async () => {
      prisma.user.create.mockResolvedValue(user);

      const createUserResponse = await request(app)
        .post("/user")
        .send({ name: user.name });

      expect(createUserResponse.status).toBe(201);

      // check response session cookie 'qid'
      expect(hasSessionCookie(createUserResponse)).toBe(true);

      const cookie = getSessionCookie(createUserResponse);

      expect(cookie).toBeDefined();

      prisma.user.findMany.mockResolvedValue([user]);

      const response = await request(app).get("/user").set("Cookie", [cookie!]);

      // todo add zod validation for routes, to keep mocks consistent types

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0].id).toBe(user.id);
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0].name).toBe(user.name);
    });
  });

  describe("POST /user", () => {
    it("should return 400 if name is missing", async () => {
      const response = await request(app).post("/user").send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("POST /pomodoro", () => {
    it("should return 401 Unauthorized if not authenticated", async () => {
      const response = await request(app).post("/pomodoro");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Unauthorized");
    });
  });
});

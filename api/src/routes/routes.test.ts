import { beforeEach, describe, expect, it, test } from "vitest";
import request from "supertest";
import { createServer } from "../server.js";
import { Application } from "express";

describe("TEST Routes", () => {
  let app: Application;
  beforeEach(async () => {
    app = await createServer();
  });

  describe("POST /pomodoro", () => {
    it("should return 401 Unauthorized if not authenticated", async () => {
      const response = await request(app).post("/pomodoro");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Unauthorized");
    });
  });
});

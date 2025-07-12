import { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

type ValidationOptions = { body?: ZodSchema; params?: ZodSchema; query?: ZodSchema };

export function validateRequest(schema: ValidationOptions) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schema.body) {
        const validatedBody = await schema.body.parseAsync(req.body);
        req.body = validatedBody;
      }
      if (schema.params) {
        const validatedParams = await schema.params.parseAsync(req.params);
        req.params = validatedParams;
      }
      if (schema.query) {
        const validatedQuery = await schema.query.parseAsync(req.query);
        req.query = validatedQuery;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Validation failed",
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  };
}
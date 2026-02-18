import type { ZodSchema } from "zod";

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
  }

  toJSON(): ApiError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

export const validateRequest = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Invalid request data",
      400,
      { errors: result.error.flatten() }
    );
  }
  return result.data;
};

export const notFound = (resource: string): never => {
  throw new AppError("NOT_FOUND", `${resource} not found`, 404);
};

export const unauthorized = (message = "Unauthorized"): never => {
  throw new AppError("UNAUTHORIZED", message, 401);
};

export const forbidden = (message = "Forbidden"): never => {
  throw new AppError("FORBIDDEN", message, 403);
};

export const badRequest = (message: string): never => {
  throw new AppError("BAD_REQUEST", message, 400);
};

export * from "./response";
export * from "./with-auth";
export * from "./patient-lookup";
export * from "./provider-lookup";
export * from "./pharmacist-lookup";
export * from "./employer-lookup";

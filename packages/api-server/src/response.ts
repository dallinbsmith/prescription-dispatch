import { NextResponse } from "next/server";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface ApiPaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: PaginationMeta;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export const apiSuccess = <T>(data: T, status = 200): NextResponse<ApiSuccessResponse<T>> => {
  return NextResponse.json({ success: true, data }, { status });
};

export const apiError = (
  code: string,
  message: string,
  status = 500,
  details?: Record<string, unknown>
): NextResponse<ApiErrorResponse> => {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, details },
    },
    { status }
  );
};

export const apiPaginated = <T>(
  data: T[],
  pagination: PaginationMeta,
  status = 200
): NextResponse<ApiPaginatedResponse<T>> => {
  return NextResponse.json({ success: true, data, pagination }, { status });
};

export const apiUnauthorized = (message = "Not authenticated"): NextResponse<ApiErrorResponse> => {
  return apiError("UNAUTHORIZED", message, 401);
};

export const apiForbidden = (message = "Access denied"): NextResponse<ApiErrorResponse> => {
  return apiError("FORBIDDEN", message, 403);
};

export const apiNotFound = (resource: string): NextResponse<ApiErrorResponse> => {
  return apiError("NOT_FOUND", `${resource} not found`, 404);
};

export const apiBadRequest = (
  message: string,
  details?: Record<string, unknown>
): NextResponse<ApiErrorResponse> => {
  return apiError("BAD_REQUEST", message, 400, details);
};

export const apiValidationError = (
  errors: Record<string, unknown>
): NextResponse<ApiErrorResponse> => {
  return apiError("VALIDATION_ERROR", "Invalid request data", 400, { errors });
};

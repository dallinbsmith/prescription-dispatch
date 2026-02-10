import type { ApiResponse } from "@rx/types";

export interface ApiClientConfig {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null>;
}

export const createApiClient = (config: ApiClientConfig) => {
  const { baseUrl, getAccessToken } = config;

  const request = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    const url = `${baseUrl}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (getAccessToken) {
      const token = await getAccessToken();
      if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      return {
        data: null as unknown as T,
        success: false,
        error: error || `HTTP ${response.status}`,
      };
    }

    const data = (await response.json()) as T;
    return { data, success: true };
  };

  return {
    get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),

    post: <T>(endpoint: string, body: unknown) =>
      request<T>(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      }),

    put: <T>(endpoint: string, body: unknown) =>
      request<T>(endpoint, {
        method: "PUT",
        body: JSON.stringify(body),
      }),

    patch: <T>(endpoint: string, body: unknown) =>
      request<T>(endpoint, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),

    delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
  };
};

export type ApiClient = ReturnType<typeof createApiClient>;

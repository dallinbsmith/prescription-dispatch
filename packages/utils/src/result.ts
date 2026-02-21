export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export const ok = <T>(data: T): Result<T, never> => ({
  success: true,
  data,
});

export const err = <E>(error: E): Result<never, E> => ({
  success: false,
  error,
});

export const isOk = <T, E>(result: Result<T, E>): result is { success: true; data: T } =>
  result.success;

export const isErr = <T, E>(result: Result<T, E>): result is { success: false; error: E } =>
  !result.success;

export const unwrap = <T, E>(result: Result<T, E>): T => {
  if (result.success) {
    return result.data;
  }
  if (result.error instanceof Error) {
    throw result.error;
  }
  throw new Error(String(result.error));
};

export const unwrapOr = <T, E>(result: Result<T, E>, defaultValue: T): T => {
  if (result.success) {
    return result.data;
  }
  return defaultValue;
};

export const map = <T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => U
): Result<U, E> => {
  if (result.success) {
    return ok(fn(result.data));
  }
  return result;
};

export const mapErr = <T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> => {
  if (!result.success) {
    return err(fn(result.error));
  }
  return result;
};

export const fromPromise = async <T>(
  promise: Promise<T>
): Promise<Result<T>> => {
  try {
    const data = await promise;
    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
};

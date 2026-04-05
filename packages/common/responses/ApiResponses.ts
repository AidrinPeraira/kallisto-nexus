export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown;
  };
}

/**
 * This function creates a response
 * json consistent with the response shape defined
 *
 * @param data Payload data (optional)
 * @param message Success Message
 * @returns Data and message mapped to response type
 */
export function successResponse<T>(
  data?: T,
  message = "Success",
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    message,
  };

  //if we have data we add that
  if (data !== undefined) {
    response.data = data;
  }

  return response;
}

/**
 * This function creates an error response
 * json consistent with the response shape defined
 *
 * @param message Error Message
 * @param code Error Code
 * @param details Error Details (optional)
 * @returns Error message mapped to response type
 */
export function errorResponse(
  message: string,
  code = "ERROR",
  details?: unknown,
): ApiResponse<null> {
  const response: ApiResponse<null> = {
    success: false,
    message,
    error: {
      code,
    },
  };

  //if we have derails we add that to the error part
  if (details !== undefined) {
    response.error!.details = details;
  }

  return response;
}

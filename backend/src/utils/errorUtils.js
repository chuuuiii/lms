

export const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// export const errorMessage = {
//   NOT_FOUND: 'Resource not found',
//   UNAUTHORIZED: 'Unauthorized access',
//   FORBIDDEN: 'Forbidden access',
//   VALIDATION_ERROR: 'Validation error',
//   SERVER_ERROR: 'Internal Server error',
//   DUPLICATION_ERROR: 'Resource already exist'
// };
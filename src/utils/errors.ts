export const errors = {
  INVALID_TOKEN: {
    httpCode: 400,
    errorCode: 400_003,
    description: 'Invalid token',
  },
  AUTHENTICATION_FAILED: {
    httpCode: 401,
    errorCode: 401_001,
    description: 'Authentication failed',
  },
  NOT_FOUND_USER: {
    httpCode: 404,
    errorCode: 404_000,
    description: 'User not found',
  },
  USER_CREATION_CONFLICT: {
    httpCode: 422,
    errorCode: 422_001,
    description: 'User already exists',
  },
  VALIDATION_ERROR: {
    httpCode: 422,
    errorCode: 422_000,
    description: 'Validation error',
  },
  INTERNAL_SERVER_ERROR: {
    httpCode: 500,
    errorCode: 500_000,
    description: 'Internal server error',
  }
};

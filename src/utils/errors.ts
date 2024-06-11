export const errors = {
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

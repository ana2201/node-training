import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';
import { errors } from '../utils/errors';
 

export async function expressAuthentication(
  request: Request,
  securityName: string
) {
  // eslint-disable-next-line no-undef
  const secret = process.env.JWT_ACCESS_SECRET;

  if (securityName === 'jwt' && secret) {
    const token = request.headers.authorization;    

    try {
      if (!token) {
        throw new ApiError(errors.INVALID_TOKEN);
      }

      const payload = jwt.verify(token, secret) as { email: string };
      
      return {...payload};
    } catch (err) {
      throw new ApiError(errors.INVALID_TOKEN);
    }
  }

  return null;
}

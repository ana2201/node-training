import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import { ApiError } from '../utils/apiError';
import { errors } from '../utils/errors';
import { Auth, LoginParams } from '../types/auth';

const prisma = new PrismaClient();

export class AuthService {
  static async login(params: LoginParams): Promise<Auth> {
    // eslint-disable-next-line no-undef
    const secret = process.env.JWT_ACCESS_SECRET;
    
    try {
      const { email, password } = params;

      if (email && password && secret) {
        const user = await prisma.user.findUnique({ where: { email: email } });
        
        if (user?.password !== password) {
          throw new ApiError(errors.AUTHENTICATION_FAILED);
        } 

        const result = jwt.sign({ email }, secret);
        return { token: result };
      } else {
        throw new ApiError(errors.AUTHENTICATION_FAILED);
      }
    } catch (error) {
      throw new ApiError(errors.INTERNAL_SERVER_ERROR);
    }
  }
}

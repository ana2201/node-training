import { PrismaClient, Prisma } from '@prisma/client';

import { User, UserCreationParams } from 'types/user';
import { ApiError } from 'utils/apiError';
import { errors } from 'utils/errors';

const prisma = new PrismaClient();

export class UsersService {
  static async getUser(id: number): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
      
    if (!user) {
      throw new ApiError(errors.NOT_FOUND_USER);
    }

    return user;
  }

  static async createUser(userCreationParams: UserCreationParams): Promise<User> {
    try {
      const user = await prisma.user.create({
        data: {
          name: userCreationParams.name,
          lastname: userCreationParams.lastname,
          email: userCreationParams.email,
          password: userCreationParams.password
        }
      });
  
      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') { // Prisma error: Unique constraint failed on the {constraint}
        throw new ApiError(errors.USER_CREATION_CONFLICT);
      }

      throw e;
    }
  }

  static async deleteUser(id: number): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
      
    if (!user) {
      throw new ApiError(errors.NOT_FOUND_USER);
    }
    
    return await prisma.user.delete({ where: { id } }); 
  }
}

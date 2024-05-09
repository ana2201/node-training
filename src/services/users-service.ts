import { PrismaClient } from '@prisma/client';

import { User, UserCreationParams } from '../types/user';

const prisma = new PrismaClient();

export class UsersService {
  static async getUser(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {id}
    });
    return user;
  }

  static async createUser(userCreationParams: UserCreationParams): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: userCreationParams.name,
        lastname: userCreationParams.lastname,
        email: userCreationParams.email,
        password: userCreationParams.password
      }
    });
    
    return user;
  }
}

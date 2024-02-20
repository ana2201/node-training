import { PrismaClient } from '@prisma/client';

import { User } from '../controllers/user';

const prisma = new PrismaClient();

export type UserCreationParams = Pick<User, 'email' | 'name' | 'lastname' | 'password'>;

export class UsersService {
  public async get(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {id}
    });
    return user;
  }

  public async create(userCreationParams: UserCreationParams): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id: Math.floor(Math.random() * 10000),
        name: userCreationParams.name,
        lastname: userCreationParams.lastname,
        email: userCreationParams.email,
        password: userCreationParams.password
      }
    });
    
    return user;
  }
}

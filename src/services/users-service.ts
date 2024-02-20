// import  { Request, Response } from 'express';
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

}

import  { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);

    const u = await prisma.user.findUnique({
      where: {id}
    });

    res.send(u ? `User information --> ${JSON.stringify(u)}` : 'the user does not exist');
  } catch (error) {
    res.status(400).send('The id must be a number'); 
  }
};

export { getUser };
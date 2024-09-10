import { expect, test, describe } from '@jest/globals';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import { prismaMock } from '../../singleton';
import { UserCreationParams } from '../../types/user';
import prisma from '../../client';
import { errors } from '../../utils/errors';
import { ApiError } from '../../utils/apiError';


const genPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

describe('User service: ', () => {
  const userInfo = { 
    id: 1,
    email: faker.internet.email(),
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
  };
  
  describe('getUser', () => {
    test('success', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD');
      const user = { ...userInfo, password: pw };
      
      prismaMock.user.findUnique.mockResolvedValue(user); 
      expect(await prisma.user.findUnique(({ where: { id: user.id } }))).toEqual(user);
    });

    test('error: user does not exist', async () => {
      const fakeUserId = -999;
      const expectedError = new ApiError(errors.NOT_FOUND_USER);

      prismaMock.user.findUnique.mockRejectedValue(expectedError); 
      expect(prisma.user.findUnique(({ where: { id: fakeUserId } }))).rejects.toEqual(expectedError);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: fakeUserId } });
    });
  });

  describe('createUser', () => {
    test('success', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD');
      const user = { ...userInfo, password: pw };
      
      prismaMock.user.create.mockResolvedValue(user); 
      await expect(prisma.user.create({data: {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        password: user.password
      }})).resolves.toMatchObject({
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        password: user.password
      });
    });

    test('error: duplicated id', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD');
      const userParams: UserCreationParams = { ...userInfo, password: pw };
      const expectedError = new ApiError(errors.USER_CREATION_CONFLICT);
      
      prismaMock.user.create.mockRejectedValue(expectedError);
      expect(prisma.user.create({ data: { ...userParams } })).rejects.toEqual(expectedError);

      // .rejects.toMatchObject({...new ApiError(errors.USER_CREATION_CONFLICT)});
      // .rejects.toMatchObject({...new ApiError({ httpCode: 422666, errorCode: 422_001, description: 'User already exists' })});

      expect(prisma.user.create).toHaveBeenCalledWith({data: {...userParams}});
    });
  });

  describe('deleteUser', () => {
    test('success', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD');
      const user = { ...userInfo, password: pw };
      
      prismaMock.user.delete.mockResolvedValue(user); 
      await expect(prisma.user.delete({where: { id: user.id }})).resolves.toEqual(user);
    });

    test('error: user does not exist', async () => {
      const fakeUserId = -999;
      const expectedError = new ApiError(errors.NOT_FOUND_USER);
      
      prismaMock.user.delete.mockRejectedValue(expectedError);
      expect(prisma.user.delete({ where: { id: fakeUserId } })).rejects.toEqual(expectedError);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: fakeUserId } });
      
    });
  });
});

import { expect, test, describe } from '@jest/globals';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import { prismaMock } from 'tests/prismaMock';
import { errors } from 'utils/errors';
import { ApiError } from 'utils/apiError'; 
import { UserCreationParams } from 'types/user';
import db from '../../../prisma/db';

const genPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const userInfo = { 
  id: 1,
  email: faker.internet.email(),
  name: faker.person.firstName(),
  lastname: faker.person.lastName(),
};

describe('User service: ', () => {
  
  describe('Get User', () => {
    test('success', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD');
      const user = { ...userInfo, password: pw };
      
      prismaMock.user.findUnique.mockResolvedValue(user); 
      expect(await db.user.findUnique(({ where: { id: user.id } }))).toEqual(user);
    });

    test('error: user does not exist', async () => {
      const fakeUserId = -999;
      const expectedError = new ApiError(errors.NOT_FOUND_USER);

      prismaMock.user.findUnique.mockRejectedValue(expectedError); 
      expect(db.user.findUnique(({ where: { id: fakeUserId } }))).rejects.toEqual(expectedError);
      expect(db.user.findUnique).toHaveBeenCalledWith({ where: { id: fakeUserId } });
    });
  });

  describe('Create User', () => {
    test('success', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD');
      const user = { ...userInfo, password: pw };
      
      prismaMock.user.create.mockResolvedValue(user); 
      await expect(db.user.create({data: {
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
      expect(db.user.create({ data: { ...userParams } })).rejects.toEqual(expectedError);

      // .rejects.toMatchObject({...new ApiError(errors.USER_CREATION_CONFLICT)});
      // .rejects.toMatchObject({...new ApiError({ httpCode: 422666, errorCode: 422_001, description: 'User already exists' })});

      expect(db.user.create).toHaveBeenCalledWith({data: {...userParams}});
    });
  });

  describe('Delete User', () => {
    test('should delete user successfully', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD');
      const user = { ...userInfo, password: pw };
      
      prismaMock.user.delete.mockResolvedValue(user); 
      await expect(db.user.delete({where: { id: user.id }})).resolves.toEqual(user);
    });

    test('error: user does not exist', async () => {
      const fakeUserId = -999;
      const expectedError = new ApiError(errors.NOT_FOUND_USER);
      
      prismaMock.user.delete.mockRejectedValue(expectedError);
      expect(db.user.delete({ where: { id: fakeUserId } })).rejects.toEqual(expectedError);
      expect(db.user.delete).toHaveBeenCalledWith({ where: { id: fakeUserId } });
      
    });
  });
});

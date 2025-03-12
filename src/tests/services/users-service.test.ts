import { expect, it, describe } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { prismaMock } from '../../tests/prismaMock';
import { errors } from '../../utils/errors';
import { ApiError } from '../../utils/apiError'; 
import { UserCreationParams } from '../../types/user';
import db from '../../../prisma/db';

const userInfo = { 
  id: 1,
  email: faker.internet.email(),
  name: faker.person.firstName(),
  lastname: faker.person.lastName(),
};
const seed = 7;

describe('User service: ', () => {
  describe('Get User', () => {
    it('should get user by id', async () => {
      const pw = faker.seed(seed).toString();
      const user = { ...userInfo, password: pw };
      
      prismaMock.user.findUnique.mockResolvedValue(user);
      expect(await db.user.findUnique(({ where: { id: user.id } })))
        .toEqual(user);
      expect(db.user.findUnique).toHaveBeenCalledWith({ where: { id: user.id } });
    });

    it('should throw an error: user does not exist', async () => {
      const fakeUserId = -999;

      prismaMock.user.findUnique.mockRejectedValue(null); 
      expect(db.user.findUnique(({ where: { id: fakeUserId } }))).rejects.toEqual(null);
      expect(db.user.findUnique).toHaveBeenCalledWith({ where: { id: fakeUserId } });
    });
  });

  describe('Create User', () => {
    it('should create user successfully', async () => {
      const pw = faker.seed(seed).toString();
      const user = { ...userInfo, password: pw };
      
      prismaMock.user.create.mockResolvedValue(user); 
      await expect(db.user.create({data: {...user}})).resolves.toMatchObject({...user});
      expect(db.user.create).toHaveBeenCalledWith({data: {...user}});
    });

    it('should throw an error: duplicated id', async () => {
      const pw = faker.seed(seed).toString();
      const userParams: UserCreationParams = { ...userInfo, password: pw };
      const expectedError = new ApiError(errors.USER_CREATION_CONFLICT);
      
      prismaMock.user.create.mockRejectedValue(expectedError);
      expect(db.user.create({ data: { ...userParams } })).rejects.toEqual(expectedError);
      expect(db.user.create).toHaveBeenCalledWith({data: {...userParams}});
    });
  });

  describe('Delete User', () => {
    it('should delete user successfully', async () => {
      const pw = faker.seed(seed).toString();
      const user = { ...userInfo, password: pw };
      
      prismaMock.user.delete.mockResolvedValue(user); 
      await expect(db.user.delete({where: { id: user.id }})).resolves.toEqual(user);
      expect(db.user.delete).toHaveBeenCalledWith({ where: { id: user.id } });
    });

    it('should throw an error: user does not exist', async () => {
      const fakeUserId = -999; 
      
      prismaMock.user.delete.mockRejectedValue(null);
      expect(db.user.delete({ where: { id: fakeUserId } })).rejects.toEqual(null);
      expect(db.user.delete).toHaveBeenCalledWith({ where: { id: fakeUserId } });
    });
  });
});

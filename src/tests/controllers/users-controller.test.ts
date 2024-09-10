import { expect, it, describe, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import { UsersService } from '../../services/users-service';
import { UsersController } from '../../controllers/users-controller';
import { User, UserCreationParams } from '../../types/user';
import { ApiError } from '../../utils/apiError';
import { errors } from '../../utils/errors';

jest.mock('../../services/users-service');

const genPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

describe('User controller: ', () => {
  const controller = new UsersController();
  
  const userInfo = { 
    id: 1,
    email: faker.internet.email(),
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
  };

  describe('getUser', () => {
    it('success', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD');
      const user: User = { ...userInfo, password: pw };

      (UsersService.getUser as jest.Mock<typeof UsersService.getUser>).mockResolvedValue(user);
      const response = await controller.getUser(1);

      expect(UsersService.getUser).toHaveBeenCalled();
      expect(response).toEqual(user);
    });

    it('error: user does not exist', async () => {
      const userId = -999;
      const expectedError = new ApiError(errors.NOT_FOUND_USER);
    
      (UsersService.getUser as jest.Mock<typeof UsersService.getUser>).mockRejectedValue(expectedError);
      expect(controller.getUser(userId)).rejects.toEqual(expectedError);
      expect(UsersService.getUser).toHaveBeenCalledWith(userId);

      // try {
      //   await controller.getUser(userId);
      // } catch (error) {
      //   const { errorCode, httpCode } = error as ApiError;
      //   expect({ errorCode, httpCode }).toEqual({
      //     errorCode: errors.NOT_FOUND_USER.errorCode,
      //     httpCode: errors.NOT_FOUND_USER.httpCode
      //   });
      // }
    });
  });

  describe('createUser', () => {
    it('success', async () => { 
      const pw = await bcrypt.hash('DEFAULT_PASSWORD', 10);
      const userParams: UserCreationParams = {...userInfo, password: pw  };
      const createdUser = {...userInfo, password: pw};

      (UsersService.createUser as jest.Mock<typeof UsersService.createUser>).mockResolvedValue(createdUser);

      const response = await controller.createUser(userParams);

      expect(UsersService.createUser).toHaveBeenCalledWith(userParams);
      expect(response).toEqual(createdUser);
    });

    it('error: duplicated id', async () => {
      const pw = await bcrypt.hash('DEFAULT_PASSWORD', 10);
      const user = { ...userInfo, password: pw };
      const expectedError = new ApiError(errors.USER_CREATION_CONFLICT);
    
      (UsersService.createUser as jest.Mock<typeof UsersService.createUser>).mockRejectedValue(expectedError);
    
      expect(controller.createUser(user)).rejects.toEqual(expectedError);
      expect(UsersService.createUser).toHaveBeenCalledWith(user);
    });
  });

  describe('deleteUser', () => {
    it('success', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD'); 
      const deletedUser: User = { ...userInfo, password: pw };
    
      (UsersService.deleteUser as jest.Mock<typeof UsersService.deleteUser>).mockResolvedValue(deletedUser);
    
      const response = await controller.deleteUser(deletedUser.id);
    
      expect(UsersService.deleteUser).toHaveBeenCalledWith(deletedUser.id);
      expect(response).toEqual(deletedUser);
    });

    it('error: user does not exist', async () => {
      const userId = -111;
      const expectedError = new ApiError(errors.NOT_FOUND_USER);
    
      (UsersService.deleteUser as jest.Mock<typeof UsersService.deleteUser>).mockRejectedValue(expectedError);
    
      expect(controller.deleteUser(userId)).rejects.toEqual(expectedError);
      expect(UsersService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});

import { expect, it, describe, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { UsersService } from 'services/users-service';
import { UsersController } from 'controllers/users-controller';
import { User, UserCreationParams } from 'types/user';

jest.mock('../../services/users-service');

const controller = new UsersController();

const seed = 7;
const userInfo = { 
  id: 1,
  email: faker.internet.email(),
  name: faker.person.firstName(),
  lastname: faker.person.lastName(),
};

describe('User controller: ', () => {
  describe('Get User ', () => {
    it('should get user by id', async () => {
      const pw = faker.seed(seed).toString();
      const user: User = { ...userInfo, password: pw };

      (UsersService.getUser as jest.Mock<typeof UsersService.getUser>).mockResolvedValue(user);
      const response = await controller.getUser(user.id);

      expect(UsersService.getUser).toHaveBeenCalledWith(user.id);
      expect(response).toEqual(user);
    });
  });

  describe('Create User', () => {
    it('should create user successfully', async () => { 
      const pw = faker.seed(seed).toString();
      const userParams: UserCreationParams = {...userInfo, password: pw  };
      const createdUser = {...userInfo, password: pw};

      (UsersService.createUser as jest.Mock<typeof UsersService.createUser>).mockResolvedValue(createdUser);

      const response = await controller.createUser(userParams);

      expect(UsersService.createUser).toHaveBeenCalledWith(userParams);
      expect(response).toEqual(createdUser);
    });
  });

  describe('Delete User', () => {
    it('should delete user successfully', async () => {
      const pw = faker.seed(seed).toString();
      const deletedUser: User = { ...userInfo, password: pw };
    
      (UsersService.deleteUser as jest.Mock<typeof UsersService.deleteUser>).mockResolvedValue(deletedUser);
    
      const response = await controller.deleteUser(deletedUser.id);
    
      expect(UsersService.deleteUser).toHaveBeenCalledWith(deletedUser.id);
      expect(response).toEqual(deletedUser);
    });
  });
});

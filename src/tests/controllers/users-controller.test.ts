import { expect, it, describe, jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import { UsersService } from 'services/users-service';
import { UsersController } from 'controllers/users-controller';
import { User, UserCreationParams } from 'types/user';

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

  describe('Get User ', () => {
    it('should get user by id', async () => {
      const pw = await genPassword('DEFAULT_PASSWORD');
      const user: User = { ...userInfo, password: pw };

      (UsersService.getUser as jest.Mock<typeof UsersService.getUser>).mockResolvedValue(user);
      const response = await controller.getUser(user.id);

      expect(UsersService.getUser).toHaveBeenCalledWith(user.id);
      expect(response).toEqual(user);
    });
  });

  describe('Create User', () => {
    it('should create user successfully', async () => { 
      const pw = await bcrypt.hash('DEFAULT_PASSWORD', 10);
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
      const pw = await genPassword('DEFAULT_PASSWORD'); 
      const deletedUser: User = { ...userInfo, password: pw };
    
      (UsersService.deleteUser as jest.Mock<typeof UsersService.deleteUser>).mockResolvedValue(deletedUser);
    
      const response = await controller.deleteUser(deletedUser.id);
    
      expect(UsersService.deleteUser).toHaveBeenCalledWith(deletedUser.id);
      expect(response).toEqual(deletedUser);
    });
  });
});

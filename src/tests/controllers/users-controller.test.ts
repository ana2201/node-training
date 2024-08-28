import { expect, it, describe } from '@jest/globals';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import { UsersService } from '../../services/users-service';
import { UsersController } from '../../controllers/users-controller';

const genPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};


describe('User controller: ', () => {
  describe('find functionality', () => {
    it('get user by id', async () => {
      const controller = new UsersController();

      const email = faker.internet.email();
      const pw = await genPassword('DEFAULT_PASSWORD');
      const user = { 
        id: 1,
        email,
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: pw,
      };
      

      const response = await controller.getUser(1);

      expect(UsersService.getUser).toHaveBeenCalled();
      expect(response).toEqual(user);
    });
    
    //     test('user does not exist', async () => {});
    //   });
  });
});
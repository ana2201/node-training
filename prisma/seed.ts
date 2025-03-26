import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';
import { genPassword} from '../src/helpers/utils';

const prisma = new PrismaClient();

faker.seed(11);

const USERS_AMOUNT = 5;
const DEFAULT_PASSWORD = 'pasSWord7';

const seed = async () => {
  const promises = [];

  try {
    for (let i = 0; i < USERS_AMOUNT; i++) {
      const email = faker.internet.email();
      const pw = await genPassword(DEFAULT_PASSWORD);
  
      promises.push(
        prisma.user.create({
          data: {
            email,
            password: pw,
            name: faker.person.firstName(),
            lastname: faker.person.lastName(),
          },
        })
      );
    }
    
    await Promise.all(promises);
    console.log('Success!');
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    await prisma.$disconnect();
  }
};


seed();
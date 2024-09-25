import { PrismaClient } from '@prisma/client';
import { beforeEach, jest} from '@jest/globals';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import db from '../../prisma/db';

jest.mock('../../prisma/db', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;

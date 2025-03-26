import {  it, describe, jest, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';

import { AuthController } from 'controllers/auth-controller';
import { AuthService } from 'services/auth-service';
import { LoginParams } from 'types/auth';
import { ApiError } from 'utils/apiError';
import { errors } from 'utils/errors';

jest.mock('../../services/auth-service');

const controller = new AuthController();

const secret = 'test-secret';
const email = faker.internet.email();
const password = faker.internet.password();

describe('Auth controller: ', () => {
  describe('Login', () => {
    it('should login successfully', async () => {
      const login: LoginParams = { email, password };
      const result = { token: jwt.sign({ email }, secret) };

      (AuthService.login as jest.Mock<typeof AuthService.login>).mockResolvedValue(result);
      const response = await controller.login(login);
      
      expect(AuthService.login).toHaveBeenCalledWith(login);
      expect(response).toEqual(result);
      
      // Verificar que el token es válido
      const decoded = jwt.verify(response.token, secret) as { email: string };
      expect(decoded.email).toBe(email);
    });

    it('should throw an error if login fails', async () => {
      const login: LoginParams = { email, password };
      const expectedError = new ApiError(errors.AUTHENTICATION_FAILED);
    
      (AuthService.login as jest.Mock<typeof AuthService.login>).mockRejectedValue(expectedError);
    
      await expect(controller.login(login)).rejects.toThrow(expectedError);    
      expect(AuthService.login).toHaveBeenCalledWith(login);
    });
  });  
});

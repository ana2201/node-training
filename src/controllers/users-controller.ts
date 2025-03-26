import {
  Controller,
  Post,
  Get,
  Path,
  Route,
  Body,
  Delete,
  Security
} from 'tsoa';

import { UsersService } from '../services/users-service';
import { UserCreationParams } from '../types/user';

@Route('users')
export class UsersController extends Controller {
  @Security('jwt')
  @Get('{userId}')
  public async getUser(@Path() userId: number) {
    const user = await UsersService.getUser(userId);

    return user;
  }

  @Security('jwt')
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ) {
    const user = await UsersService.createUser(requestBody);
    return user;
  }

  @Security('jwt')
  @Delete('{userId}')
  public async deleteUser(@Path() userId: number) {
    const user = await UsersService.deleteUser(userId);

    return user;
  }
}

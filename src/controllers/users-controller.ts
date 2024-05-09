import {
  Controller,
  Post,
  Get,
  Path,
  Route,
  Body
} from 'tsoa';

import { UsersService } from '../services/users-service';
import { User, UserCreationParams } from '../types/user';

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number
  ): Promise<User | string> {
    const user = await UsersService.getUser(userId);

    return user ?? 'the user does not exist';
  }

  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ) {
    const user = await UsersService.createUser(requestBody);
    return `${user.email} created`;
  }
}

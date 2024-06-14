import {
  Controller,
  Post,
  Get,
  Path,
  Route,
  Body
} from 'tsoa';

import { UsersService } from '../services/users-service';
import { UserCreationParams } from '../types/user';

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number) {
    const user = await UsersService.getUser(userId);

    return user;
  }

  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ) {
    const user = await UsersService.createUser(requestBody);
    return user;
  }
}

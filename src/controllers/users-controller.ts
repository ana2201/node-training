import {
  Controller,
  Post,
  Get,
  Path,
  Route,
  Body
} from 'tsoa';

import { UserCreationParams, UsersService } from '../services/users-service';

import { User } from './user';

@Route('users')
export class UsersController extends Controller {
  @Get('{userID}')
  public async getUser(
    @Path() userID: number
  ): Promise<User | null> {
    return new UsersService().get(userID);
  }

  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    new UsersService().create(requestBody);
  }
}

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
  @Get('{userID}')
  public async getUser(
    @Path() userID: number
  ): Promise<User | null> {
    return new UsersService().getUser(userID);
  }

  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    new UsersService().createUser(requestBody);
  }
}

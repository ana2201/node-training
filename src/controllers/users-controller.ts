import {
  Controller,
  Get,
  Path,
  Route,
} from 'tsoa';

import { UsersService } from '../services/users-service';
import { User } from './user';

@Route('users')
export class UsersController extends Controller {
  @Get('{userID}')
  public async getUser(
    @Path() userID: number
  ): Promise<User | null> {
    return new UsersService().get(userID);
  }
}

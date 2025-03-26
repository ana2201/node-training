import {
  Controller,
  Post,
  Body,
  Route
} from 'tsoa';

 
import { AuthService } from '../services/auth-service';
import { LoginParams } from '../types/auth';

@Route('')
export class AuthController extends Controller {
  @Post('login')
  public async login(
    @Body() requestBody: LoginParams
  ) {
    return await AuthService.login(requestBody);
  }
}


import {
  Controller,
  Get,
  Middlewares,
  Query,
  Route,
} from 'tsoa';

import { MessageService } from '../services/message-service';
import { loggerMiddleware } from '../middleware/message-middleware';

@Route('message')
@Middlewares(loggerMiddleware)
export class MessagesController extends Controller {
  @Get()
  public async getMessage(
    @Query() message: string
  ): Promise<string> {
    return MessageService.get(message);
  }
}

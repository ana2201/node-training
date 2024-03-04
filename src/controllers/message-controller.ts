import {
  Controller,
  Get,
  Query,
  Route,
} from 'tsoa';

import { MessageService } from '../services/message-service';

@Route('message')
export class MessagesController extends Controller {
  @Get()
  public async getMessage(
    @Query() message: string
  ): Promise<string> {
    return new MessageService().get(message);
  }
}

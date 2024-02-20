export class MessageService {
  public async get(message: string): Promise<string> {
    
    return `Hello ${message}`;
  }
}

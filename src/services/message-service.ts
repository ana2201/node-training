export class MessageService {
  static async get(message: string): Promise<string> {
    
    return `Hello ${message}`;
  }
}

export interface User {
  id: number;
  email: string;
  name: string;
  lastname:  string
  password: string
}

export type UserCreationParams = Omit<User, 'id'>;

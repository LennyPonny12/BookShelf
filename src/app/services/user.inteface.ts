import { Book } from './book.interface';

export interface User {
  email: string;
  username: string;
  imgUrl: string;
  numberBooks: number;
  books: Book[];
  _token: string;
  _tokenExpiration: Date;
}

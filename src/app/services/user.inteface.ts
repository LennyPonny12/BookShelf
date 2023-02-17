import { Book } from './book.interface';

export interface User {
  email: string;
  username: string;
  imgUrl: string;
  numberBooks: number;
  books: Book[];
}

import { Activity } from './activity.inteface';
import { Book } from './book.interface';

export interface User {
  email: string;
  username: string;
  imgUrl: string;
  books: Book[];
  activity: Activity[];
  _id: string;
  _token: string;
  _tokenExpiration: Date;
}

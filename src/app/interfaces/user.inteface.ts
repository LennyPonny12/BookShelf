import { Activity } from './activity.inteface';
import { Book } from './book.interface';
import { Review } from './review';

export interface User {
  email: string;
  username: string;
  imgUrl: string;
  books: Book[];
  activity: Activity[];
  reviews: Review[];
  _id: string;
  _token: string;
  _tokenExpiration: Date;
}

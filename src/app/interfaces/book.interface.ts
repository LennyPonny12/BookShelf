import { CommentInter } from './comment.interface';

export interface Book {
  id: number;
  author: string;
  title: string;
  imgUrl: string;
  comments: CommentInter[]; //userId
  pages: number;
  timeToRead: number;
  rating: number;
}

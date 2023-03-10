import { CommentInter } from './comment.interface';

export interface Book {
  id: string;
  idNumber: number;
  author: string;
  title: string;
  imgUrl: string;
  comments: CommentInter[];
  pages: number;
  timeToRead: number;
  rating: number;
  description: string;
}

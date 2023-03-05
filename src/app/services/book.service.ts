import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/book.interface';
import { CommentInter } from '../interfaces/comment.interface';
import { User } from '../interfaces/user.inteface';

@Injectable({
  providedIn: 'root',
})
export class BookSerivce {
  books = new BehaviorSubject<Book[]>([null]);

  constructor(private http: HttpClient) {}

  // push() {
  //   this.http
  //     .post<Book>(
  //       'https://bookshelf-1a062-default-rtdb.firebaseio.com/books/.json',
  //       {
  //         author: 'To Kill a Mockingbird',
  //         title: 'Harper Lee',
  //         comments: [],
  //         imgUrl:
  //           'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg',
  //         pages: 511,
  //         rating: 3.9,
  //         timeToRead: 27.1,
  //         id: 4,
  //       }
  //     )
  //     .subscribe((data) => {});
  // }

  getBooks() {
    this.http
      .get<Book[]>(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/books.json`
      )
      .subscribe((data) => {
        let arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        this.books.next(arr);
      });
  }

  getBook(id: number) {
    return this.books.getValue()[id];
  }

  getUserComment() {
    return this.http.get<User>(
      `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/.json`
    );
  }

  addComment(id: string, userId: string, title: string, description: string) {
    this.http
      .post<CommentInter>(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/books/${id}/comments/.json`,
        { userId: userId, title: title, description: description }
      )
      .subscribe();
  }

  removeComment(bookId: string, commentId: string) {
    this.http
      .delete(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/books/${bookId}/comments/${commentId}/.json`
      )
      .subscribe();
  }
}

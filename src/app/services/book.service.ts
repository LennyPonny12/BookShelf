import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../interfaces/book.interface';
import { CommentInter } from '../interfaces/comment.interface';
import { User } from '../interfaces/user.inteface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookSerivce {
  books = new BehaviorSubject<Book[]>([null]);
  userHasBook = new BehaviorSubject<boolean>(false);
  avgRatingSubject = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private authService: AuthService) {}

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

  getBookByStringId(id: string) {
    return this.http.get<Book>(
      `https://bookshelf-1a062-default-rtdb.firebaseio.com/books/${id}/.json`
    );
  }

  getUserComment(id: string) {
    return this.http.get<User>(
      `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${id}/.json`
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

  addBookToProfile(idNumber: number, rating: number) {
    this.http
      .post(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${this.authService.user._id}/books.json`,
        {
          id: Object.values(this.books.getValue()[idNumber])[0],
          rating: rating,
        }
      )
      .subscribe((data) => {
        this.http
          .put(
            `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${
              this.authService.user._id
            }/books/${Object.values(data)[0]}.json`,
            {
              id: Object.values(this.books.getValue()[idNumber])[0],
              rating: rating,
              idToChange: Object.values(data)[0],
            }
          )
          .subscribe(() => {
            this.authService.emitWhenUserUpdates();
          });
      });
  }

  checkUserHasBOok(bookId: string, userId: string) {
    let book: string;
    let user: boolean;

    if (!this.authService.user) {
      this.userHasBook.next(false);
      return;
    }

    this.http
      .get<Book>(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/books/${bookId}/.json`
      )
      .subscribe((data) => {
        book = bookId;

        this.http
          .get<Book>(
            `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/books/.json`
          )
          .subscribe((data) => {
            if (data) {
              Object.values(data).forEach((bookEl) => {
                if (book === bookEl.id) user = true;
              });

              if (user) this.userHasBook.next(true);
              else this.userHasBook.next(false);
            } else {
              this.userHasBook.next(false);
            }
          });
      });
  }

  getRatingOfBook(userId: string, bookId: string) {
    return this.http.get(
      `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/books/.json`
    );
  }

  changeRatingOfBook(rating: number, book: Book) {
    return this.http
      .get(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${this.authService.user._id}/books/.json`
      )
      .subscribe((data) => {
        let books = Object.values(data);
        let correctBook = books.find((bookFind) => {
          if (book.id === bookFind.id) return bookFind;
        });
        console.log(correctBook);

        this.http
          .put(
            `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${this.authService.user._id}/books/${correctBook.idToChange}/.json`,
            {
              id: correctBook.id,
              rating: rating,
              idToChange: correctBook.idToChange,
            }
          )
          .subscribe();
      });
  }

  gettingAvgRatingOfBook(bookId: string) {
    this.http
      .get<User[]>(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/.json`
      )
      .subscribe((data) => {
        let arrOfUsers = Object.values(data);
        let ratings = [];
        arrOfUsers.forEach((user) => {
          if (!user.books) return;

          let booksOfUser = Object.values(user.books);
          booksOfUser.forEach((book) => {
            if (book.id === bookId) ratings.push(book.rating);
          });
        });
        let allratings = ratings.reduce((acc, value) => acc + value, 0);
        this.avgRatingSubject.next((allratings / ratings.length).toFixed(2));
      });
  }
}

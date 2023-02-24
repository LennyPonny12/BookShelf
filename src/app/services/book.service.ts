import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/book.interface';
import { User } from '../interfaces/user.inteface';

@Injectable({
  providedIn: 'root',
})
export class BookSerivce {
  books = new BehaviorSubject<Book[]>([
    {
      id: 0,
      author: 'Terry Pratchett',
      title:
        'Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch',
      comments: [{ title: 'good', description: 'Lol!!!!', userId: 'dWO1h9' }],
      imgUrl:
        'https://s.lubimyczytac.pl/upload/books/4994000/4994973/946964-352x500.jpg',
      pages: 300,
      rating: 4.51,
      timeToRead: 11.5,
      description:
        "According to the Nice and Accurate Prophecies of Agnes Nutter - the world's only totally reliable guide to the future - the world will end on a Saturday. Next Saturday, in fact. Just after tea",
    },
  ]);

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
          arr.push(data[key]);
        }
        this.books.next(arr);
      });
  }

  getBook(id: number) {
    return this.books.getValue()[id];
  }

  getUserComment(id: string) {
    return this.http.get<User>(
      `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${id}.json`
    );
  }
}

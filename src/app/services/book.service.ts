import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/book.interface';

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
    },
  ]);

  constructor(private http: HttpClient) {}

  // push() {
  //   this.http
  //     .post<Book>(
  //       'https://bookshelf-1a062-default-rtdb.firebaseio.com/books/.json',
  //       {
  //         author: 'Terry Pratchett',
  //         title:
  //           'Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch',
  //         comments: [
  //           { title: 'good', description: 'Lol!!!!', userId: 'dWO1h9' },
  //         ],
  //         imgUrl:
  //           'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1615552073i/12067.jpg',
  //         pages: 300,
  //         rating: 4.51,
  //         timeToRead: 11.5,
  //       }
  //     )
  //     .subscribe((data) => {});
  // }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/book.interface';
import { Review } from '../interfaces/review';
import { User } from '../interfaces/user.inteface';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  reviews = new BehaviorSubject<Review[]>(null);

  constructor(private http: HttpClient) {}

  getReviewsFromDatabase() {
    this.http
      .get('https://bookshelf-1a062-default-rtdb.firebaseio.com/reviews/.json')
      .subscribe((data) => {
        let arr = [];
        for (let key in data) {
          arr.push(data[key]);
        }
        this.reviews.next(arr);
      });
  }

  getReviewImage(bookId: string) {
    return this.http.get<string>(
      `https://bookshelf-1a062-default-rtdb.firebaseio.com/books/${bookId}/imgUrl.json`
    );
  }

  getReview(reviewId: string) {
    return this.http.get<Review>(
      `https://bookshelf-1a062-default-rtdb.firebaseio.com/reviews/${reviewId}/.json`
    );
  }

  getUser(userId: string) {
    return this.http.get<User>(
      `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/.json`
    );
  }

  postReview(userId: string, bookId: string, title: string, content: string) {
    this.http
      .get(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/.json`
      )
      .subscribe((data) => {
        this.http
          .post<Review>(
            'https://bookshelf-1a062-default-rtdb.firebaseio.com/reviews/.json',
            {}
          )
          .subscribe((dataInner) => {
            console.log(dataInner);
            this.http
              .put(
                `https://bookshelf-1a062-default-rtdb.firebaseio.com/reviews/${
                  Object.values(dataInner)[0]
                }/.json`,
                {
                  userId: userId,
                  bookId: bookId,
                  title: title,
                  content: content,
                  date: new Date(),
                  id: Object.values(dataInner)[0],
                }
              )
              .subscribe();
            this.http
              .post<Review>(
                `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/reviews/.json`,
                {
                  id: Object.values(dataInner)[0],
                }
              )
              .subscribe();
          });
      });
  }
}

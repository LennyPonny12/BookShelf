import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Review } from '../interfaces/review';
import { User } from '../interfaces/user.inteface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  reviews = new BehaviorSubject<Review[]>(null);

  constructor(private http: HttpClient, private authService: AuthService) {}

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
              .subscribe((dataIdToChange) => {
                this.http
                  .put(
                    `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/reviews/${
                      Object.values(dataIdToChange)[0]
                    }.json`,
                    {
                      id: Object.values(dataInner)[0],
                      idToChange: Object.values(dataIdToChange)[0],
                    }
                  )
                  .subscribe();
              });
          });
      });
  }

  deleteReview(reviewId, userId) {
    // this.http
    //   .delete(
    //     `https://bookshelf-1a062-default-rtdb.firebaseio.com/reviews/${reviewId}/.json`
    //   )
    //   .subscribe((data) => {
    //     this.http.get(
    //       `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/reviews/.json`
    //     );
    //   });

    this.http
      .get(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/reviews/.json`
      )
      .subscribe((data) => {
        let arrayOfReviews = Object.values(data);
        let correctReview = arrayOfReviews.find(
          (review) => review.id === reviewId
        );

        this.http
          .delete(
            `https://bookshelf-1a062-default-rtdb.firebaseio.com/reviews/${reviewId}/.json`
          )
          .subscribe();

        this.http
          .delete(
            `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/reviews/${correctReview.idToChange}.json`
          )
          .subscribe(() => {
            this.authService.emitWhenUserUpdates();
            window.location.reload();
          });
      });
  }
}

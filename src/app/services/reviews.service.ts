import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  postReview() {
    this.http
      .post<Review>(
        'https://bookshelf-1a062-default-rtdb.firebaseio.com/reviews/.json',
        {
          userId: 'bqiAjj',
          bookId: '-NP-DZmv1NLdSIrzGEUG',
          title: 'Another Review',
          content:
            'Death, what would make more sense than to laugh about and together with the inevitable skinny buddy, but don´t dare to try to manipulate him and his work, oh no. Not just because asking for trouble with an interdimensional, almighty entity is a bit of a stupid idea and destined to end badly, but because of the stability of the universe and reality, congestion, overpopulation, or underutilization of earth, dungeon dimensions, heaven, or hell, and stuff related to his work.',
          date: new Date(),
        }
      )
      .subscribe();
  }
}

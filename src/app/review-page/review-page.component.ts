import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../interfaces/review';
import { User } from '../interfaces/user.inteface';
import { NewsService } from '../services/news.service';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
})
export class ReviewPageComponent implements OnInit {
  review: Review;
  author: string;
  authorId: string;
  img: string;
  loaded: boolean = false;

  constructor(
    private reviewSercie: ReviewsService,
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.reviewSercie.getReview(id).subscribe((reviewData) => {
      this.review = reviewData;
      this.reviewSercie.getReviewImage(this.review.bookId).subscribe((data) => {
        this.img = data;

        this.reviewSercie
          .getUser(this.review.userId)
          .subscribe((data: User) => {
            this.authorId = reviewData.userId;
            this.author = data.username;
            this.loaded = true;
          });
      });
    });
  }

  getDate(date: Date) {
    return this.newsService.getDate(date);
  }
}

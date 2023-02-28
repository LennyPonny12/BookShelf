import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../interfaces/review';
import { User } from '../interfaces/user.inteface';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.reviewSercie.getReview(id).subscribe((data) => {
      this.review = data;
      this.reviewSercie.getReviewImage(this.review.bookId).subscribe((data) => {
        this.img = data;

        this.reviewSercie
          .getUser(this.review.userId)
          .subscribe((data: User) => {
            let user = Object.values(data)[0];
            this.authorId = user._id;
            this.author = user.username;
            this.loaded = true;
          });
      });
    });
  }
}

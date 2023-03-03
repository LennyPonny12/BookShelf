import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Review } from 'src/app/interfaces/review';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-review-profile-item',
  templateUrl: './review-profile-item.component.html',
  styleUrls: ['./review-profile-item.component.scss'],
})
export class ReviewProfileItemComponent implements OnInit {
  @Input() reviewId: string;
  review: Review;
  imgUrl: string;
  loaded: boolean = false;
  onHover: boolean = false;

  constructor(
    private reviewService: ReviewsService,
    private rendere: Renderer2
  ) {}

  ngOnInit(): void {
    //getting review from database
    this.reviewService.getReview(this.reviewId).subscribe((review) => {
      this.review = review;
      this.reviewService
        .getReviewImage(this.review.bookId)
        .subscribe((data) => {
          this.imgUrl = data;
          this.loaded = true;
        });
    });
  }
}

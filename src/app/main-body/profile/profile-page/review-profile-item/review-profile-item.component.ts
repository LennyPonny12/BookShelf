import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/interfaces/review';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-review-profile-item',
  templateUrl: './review-profile-item.component.html',
  styleUrls: ['./review-profile-item.component.scss'],
})
export class ReviewProfileItemComponent implements OnInit {
  @Input() reviewId: string;
  @Input() canDelete: boolean;
  review: Review;
  imgUrl: string;
  loaded: boolean = false;
  onHover: boolean = false;

  constructor(
    private reviewService: ReviewsService,
    private router: Router,
    private authService: AuthService
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

  onNavigate(event: any) {
    if (event.target.classList.contains('icon__icon')) return;
    this.router.navigate(['/review', this.reviewId]);
  }

  onDeleteRevieew() {
    this.reviewService.deleteReview(this.reviewId, this.authService.user._id);
  }
}

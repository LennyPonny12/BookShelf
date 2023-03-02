import { Component, OnInit } from '@angular/core';
import { Review } from '../interfaces/review';
import { AuthService } from '../services/auth.service';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-all-review-page',
  templateUrl: './all-review-page.component.html',
  styleUrls: ['./all-review-page.component.scss'],
})
export class AllReviewPageComponent implements OnInit {
  reviews: Review[] = [];
  isLogged: boolean = false;

  constructor(private authService: AuthService, reviewService: ReviewsService) {
    reviewService.reviews.subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  ngOnInit(): void {
    if (this.authService.checkIsLogged()) {
      this.isLogged = true;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/interfaces/review';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private reviewService: ReviewsService) {}

  ngOnInit(): void {
    this.reviewService.reviews.subscribe((reviews) => {
      this.reviews = reviews.slice(-4);
    });
  }
}

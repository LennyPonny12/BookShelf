import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/interfaces/review';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
})
export class ReviewItemComponent implements OnInit {
  @Input() review: Review;
  imgUrl: string;
  onHover: boolean = false;

  constructor(private reviewService: ReviewsService) {}

  ngOnInit(): void {
    this.reviewService.getReviewImage(this.review.bookId).subscribe((data) => {
      this.imgUrl = data;
    });
  }

  onHoverFunction() {
    this.onHover = !this.onHover;
  }
}

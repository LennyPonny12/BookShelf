import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/book.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BookSerivce } from 'src/app/services/book.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
})
export class NewReviewComponent implements OnInit {
  newReviewFrom: FormGroup;
  books: Book[] = [];
  selectedBook: Book;
  inputValue: string = '';

  constructor(
    private bookService: BookSerivce,
    private reviewService: ReviewsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.newReviewFrom = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(150),
      ]),
    });
  }

  listOfSearches() {
    this.books = [];
    if (this.inputValue === '') return;

    this.bookService.books.getValue().forEach((book: Book) => {
      if (
        book.title.slice(0, this.inputValue.length).toLowerCase() ===
        this.inputValue.toLowerCase()
      )
        this.books.push(book);
    });
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    this.inputValue = '';
    this.listOfSearches();
  }

  deselectBook() {
    this.selectedBook = null;
  }

  onSubmit() {
    if (!this.newReviewFrom.valid) return;

    this.reviewService.postReview(
      this.authService.user._id,
      this.selectedBook.id,
      this.newReviewFrom.value.title,
      this.newReviewFrom.value.description
    );

    this.selectedBook = null;

    this.newReviewFrom.reset();
  }
}

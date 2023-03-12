import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/book.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BookSerivce } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  @Input() book: Book;
  @Output() cancelEdditing = new EventEmitter<boolean>();
  stars: number[] = [];
  changed: boolean = false;
  rating;

  constructor(
    private bookService: BookSerivce,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.book);
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i);
    }
    this.bookService
      .getRatingOfBook(this.authService.user._id, this.book.id)
      .subscribe((data: any) => {
        this.rating = Object.values(data);
        console.log(this.rating);
        let correctBook = this.rating.find((bookFind) => {
          if (this.book.id === bookFind.id) return bookFind;
        });
        console.log(correctBook);
        this.rating = correctBook.rating;
      });
  }

  chageRating(rating: number) {
    if (rating + 1 === this.rating) return;
    this.rating = rating + 1;
    this.changed = true;
  }

  changeRatingCommit() {
    this.bookService.changeRatingOfBook(this.rating, this.book);
    this.cancelEdditing.emit(false);
  }

  cancelEdit() {
    this.cancelEdditing.emit(false);
  }
}

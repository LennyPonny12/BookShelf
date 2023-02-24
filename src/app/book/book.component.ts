import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../interfaces/book.interface';
import { BookSerivce } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  book: Book;
  loaded: boolean = false;

  constructor(
    private bookService: BookSerivce,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.book = this.bookService.getBook(+param.get('id'));
      if (this.book) this.loaded = true;
    });
    this.bookService.books.subscribe((books) => {
      this.book = books[+this.route.snapshot.paramMap.get('id')];
      if (this.book) this.loaded = true;
    });
  }
}

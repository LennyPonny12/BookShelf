import { Component } from '@angular/core';
import { Book } from 'src/app/interfaces/book.interface';
import { BookSerivce } from 'src/app/services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  inputValue: string = '';
  books: Book[] = [];

  constructor(private bookService: BookSerivce) {}

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
}

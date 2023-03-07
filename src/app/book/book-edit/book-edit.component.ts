import { Component, Input } from '@angular/core';
import { Book } from 'src/app/interfaces/book.interface';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent {
  @Input() book: Book;
}

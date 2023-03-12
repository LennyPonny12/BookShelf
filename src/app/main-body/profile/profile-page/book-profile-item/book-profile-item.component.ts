import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  Renderer2,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BookSerivce } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-profile-item',
  templateUrl: './book-profile-item.component.html',
  styleUrls: ['./book-profile-item.component.scss'],
})
export class BookProfileItemComponent implements AfterViewInit {
  @ViewChild('bookContainer') bookContainer: ElementRef;
  @Output() avrageRating = new EventEmitter<number>();
  @Input() bookId: string;
  @Input() rating: number;
  book: Book;
  loaded: boolean = false;
  onHover: boolean = false;

  constructor(
    private rendere: Renderer2,
    private authService: AuthService,
    private bookService: BookSerivce,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.avrageRating.emit(this.rating);
    this.bookService.getBookByStringId(this.bookId).subscribe((book) => {
      this.book = book;
      this.loaded = true;
      this.rendere.setStyle(
        this.bookContainer.nativeElement,
        'background-image',
        `url(${this.book.imgUrl})`
      );
    });
  }

  onNavigate(event: any) {
    if (event.target.classList.contains('icon__icon')) return;
    this.router.navigate(['/book', this.book.idNumber]);
  }

  onDeleteBook() {
    this.bookService.removeBookFromProfile(
      this.authService.user._id,
      this.bookId
    );
  }
}

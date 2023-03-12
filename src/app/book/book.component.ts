import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../interfaces/book.interface';
import { CommentInter } from '../interfaces/comment.interface';
import { AuthService } from '../services/auth.service';
import { BookSerivce } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  book: Book;
  numberObBooks: number = 0;
  editingBook: boolean = false;
  comments: CommentInter[] = [];
  loaded: boolean = false;
  loadedUserStatusOfBOok: boolean = false;
  isLogged = false;
  isAddingComment = false;
  userHasBook: boolean = null;
  title: string;
  description: string;
  isAddingBook: boolean = false;
  rating;
  ratingBoxArr = [1, 2, 3, 4, 5];
  avgRating: string = '0';

  constructor(
    private bookService: BookSerivce,
    private route: ActivatedRoute,
    private authService: AuthService,
    private rendere: Renderer2
  ) {}

  ngOnInit(): void {
    this.avgRating = '0';
    //checking if user has book
    if (this.authService.user) {
      this.bookService.userHasBook.subscribe((data) => {
        if (this.userHasBook === null) {
          this.userHasBook = true;
          return;
        }
        this.userHasBook = data;

        //getting user rating of book
        this.bookService
          .getRatingOfBook(this.authService.user._id, this.book.id)
          .subscribe((rating) => {
            if (rating) {
              this.rating = Object.values(rating).find((ratingSingle) => {
                if (ratingSingle.id === this.book.id) return ratingSingle;
              });
              if (this.rating) this.rating = this.rating.rating;
            }
            this.loadedUserStatusOfBOok = true;
          });
      });
    }

    //geting avrage rating of book
    this.bookService.avgRatingSubject.subscribe((data) => {
      if (isNaN(+data)) return;
      if (!data) {
        this.avgRating = '0';
        return;
      }

      this.avgRating = data;
    });

    //getting book
    this.route.paramMap.subscribe((param) => {
      this.book = this.bookService.getBook(+param.get('id'));
      if (this.book) {
        this.loaded = true;
      }
    });
    this.bookService.books.subscribe((books) => {
      this.book = books[+this.route.snapshot.paramMap.get('id')];
      if (this.book) {
        this.loaded = true;
        this.organizeComments();
        this.bookService.gettingAvgRatingOfBook(this.book.id);
        if (this.book.comments)
          this.numberObBooks = Object.values(this.book.comments).length;
        if (this.authService.user)
          this.bookService.checkUserHasBOok(
            this.book.id,
            this.authService.user._id
          );
      }
    });

    //checking if user is logged
    if (this.authService.user) {
      this.isLogged = true;
    }
  }

  addComment() {
    this.isAddingComment = false;
    this.bookService.addComment(
      this.book.id,
      this.authService.user._id,
      this.title,
      this.description
    );
  }

  organizeComments() {
    for (let key in this.book.comments) {
      this.comments.push({ commentId: key, ...this.book.comments[key] });
    }
  }

  onDelete(data: CommentInter) {
    this.bookService.removeComment(this.book.id, data.commentId);
  }

  addBookToProfile(rating: number) {
    this.bookService.addBookToProfile(this.book.idNumber, rating);
  }

  onEditMode() {
    this.editingBook = true;
    this.rendere.addClass(document.body, 'onOverlay');
    window.scroll({
      top: 0,
      left: 0,
    });
  }

  onCancelEdition(event: boolean) {
    this.editingBook = event;
    this.rendere.removeClass(document.body, 'onOverlay');
  }
}

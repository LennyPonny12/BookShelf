import { Component, OnInit } from '@angular/core';
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
  comments: CommentInter[] = [];
  loaded: boolean = false;
  loadedUserStatusOfBOok: boolean = false;
  isLogged = false;
  isAddingComment = false;
  userHasBook: boolean = null;
  title: string;
  description: string;
  rating;

  constructor(
    private bookService: BookSerivce,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.user) {
      this.bookService.userHasBook.subscribe((data) => {
        if (this.userHasBook === null) {
          this.userHasBook = true;
          return;
        }
        this.userHasBook = data;
        this.bookService
          .getRatingOfBook(this.authService.user._id, this.book.id)
          .subscribe((rating) => {
            if (rating) {
              this.rating = Object.values(rating).find((ratingSingle) => {
                return ratingSingle.id === this.book.id;
              });
              this.rating = this.rating.rating;
            }
            this.loadedUserStatusOfBOok = true;
          });
      });
    }
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

        if (this.authService.user)
          this.bookService.checkUserHasBOok(
            this.book.id,
            this.authService.user._id
          );
      }
    });
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
      console.log(this.book.comments);
    }
  }

  onDelete(data: CommentInter) {
    this.bookService.removeComment(this.book.id, data.commentId);
  }

  addBookToProfile() {
    this.bookService.addBookToProfile(this.book.idNumber);
  }
}

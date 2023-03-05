import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentInter } from 'src/app/interfaces/comment.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BookSerivce } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-comment',
  templateUrl: './book-comment.component.html',
  styleUrls: ['./book-comment.component.scss'],
})
export class BookCommentComponent implements OnInit {
  @Output() deleteEmmiter = new EventEmitter<CommentInter>();
  @Input() comment: CommentInter;
  userName: string;
  userImg: string;
  loaded: boolean = false;

  constructor(
    private bookService: BookSerivce,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bookService.getUserComment().subscribe((data) => {
      let user = Object.values(data)[0];
      this.userName = user.username;
      this.userImg = user.imgUrl;
      this.loaded = true;
    });
  }

  onDelete() {
    this.deleteEmmiter.emit(this.comment);
  }

  checkIfCanDelete() {
    if (!this.authService.user) return false;

    if (this.authService.user._id === this.comment.userId) return true;
    else return false;
  }
}

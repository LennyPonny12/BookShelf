import { Component, Input, OnInit } from '@angular/core';
import { CommentInter } from 'src/app/interfaces/comment.interface';
import { BookSerivce } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-comment',
  templateUrl: './book-comment.component.html',
  styleUrls: ['./book-comment.component.scss'],
})
export class BookCommentComponent implements OnInit {
  @Input() comment: CommentInter;
  userName: string;
  userImg: string;
  loaded: boolean = false;

  constructor(private bookService: BookSerivce) {}

  ngOnInit(): void {
    this.bookService.getUserComment(this.comment.userId).subscribe((data) => {
      let user = Object.values(data)[0];
      this.userName = user.username;
      this.userImg = user.imgUrl;
      this.loaded = true;
    });
  }
}

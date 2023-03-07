import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/interfaces/book.interface';
import { BookSerivce } from 'src/app/services/book.service';
import { User } from 'src/app/interfaces/user.inteface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: User = null;
  sub: Subscription;
  hours: number = 0;
  numOfBooks: number = 0;
  numOfReviews: number = 0;
  rating: number = 0;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //getting user
    this.sub = this.authService.userSubj.subscribe((data) => {
      this.user = data;
    });
    this.user = this.authService.user;

    if (!this.user) return;

    //calc number of reviews and checking if user has some
    if (this.user.reviews) {
      this.numOfReviews = Object.values(this.user.reviews).length;
    }

    //checking if user has books
    if (!this.user.books) return;

    //calc hours
    let bookArr = Object.values(this.user.books);
    this.userService.calcHours(this.user).forEach((id) => {
      this.http
        .get(
          `https://bookshelf-1a062-default-rtdb.firebaseio.com/books/${id.id}.json`
        )
        .subscribe((book: Book) => {
          this.hours += book.timeToRead;
          this.hours = +this.hours.toFixed(1);
        });
    });

    //calc avrage rating
    bookArr.forEach((book) => {
      this.rating += book.rating;
    });
    this.rating = +(this.rating / bookArr.length).toFixed(1);

    //calc number of books
    this.numOfBooks = bookArr.length;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.inteface';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/interfaces/book.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  user;
  avrageRating: number = 0;
  loaded: boolean = false;
  isLoggedProfile: boolean = false;
  numOfBooks: number = 0;
  hours: number = 0;

  constructor(
    private autService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private changeRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //getting user
    this.route.paramMap.subscribe((param) => {
      this.autService.getUser(param.get('id')).subscribe((user: User) => {
        this.clearUser();
        this.user = {
          username: user.username,
          id: user._id,
          books: [],
          imgUrl: user.imgUrl,
          reviews: [],
        };

        if (user.books) {
          //getting books
          Object.values(user.books).forEach((id) => {
            this.user.books.push(id);
          });
        }
        //getting reviews
        if (user.reviews) {
          Object.values(user.reviews).forEach((id) => {
            this.user.reviews.push(id);
          });
        }

        //calc hours
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
        this.numOfBooks = Object.values(this.user.books).length;

        this.loaded = true;
        //Checking if its users profile
        if (!this.autService.user) return;
        if (this.autService.user._id === this.route.snapshot.paramMap.get('id'))
          this.isLoggedProfile = true;
      });
    });
  }

  //checkign if can edit
  editProfile() {
    if (this.isLoggedProfile) {
      this.router.navigate(['edit'], { relativeTo: this.route });
    }
  }

  addToRating(rating: number) {
    this.avrageRating += rating;
    this.changeRef.detectChanges();
  }

  private clearUser() {
    this.numOfBooks = 0;
    this.loaded = false;
    this.user = null;
    this.hours = 0;
    this.isLoggedProfile = false;
    this.avrageRating = 0;
  }
}

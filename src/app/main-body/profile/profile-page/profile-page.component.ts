import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.inteface';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  user;
  loaded: boolean = false;
  isLoggedProfile: boolean = false;

  constructor(
    private autService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //getting user
    this.autService
      .getUser(this.route.snapshot.paramMap.get('id'))
      .subscribe((user: User) => {
        let userRight = Object.values(user)[0];
        this.user = {
          username: userRight.username,
          id: userRight._id,
          activity: userRight.activity,
          books: userRight.books,
          imgUrl: userRight.imgUrl,
          reviews: [],
        };
        //getting reviews
        for (let review in userRight.reviews) {
          this.user.reviews.push(userRight.reviews[review]);
        }
        this.loaded = true;

        //Checking if its users profile
        if (!this.autService.user) return;
        if (this.autService.user._id === this.route.snapshot.paramMap.get('id'))
          this.isLoggedProfile = true;
      });
  }

  //calculating hours read
  calcHours() {
    return this.userService.calcHours(this.user);
  }

  //checkign if can edit
  editProfile() {
    if (this.isLoggedProfile) {
      this.router.navigate(['edit'], { relativeTo: this.route });
    }
  }
}

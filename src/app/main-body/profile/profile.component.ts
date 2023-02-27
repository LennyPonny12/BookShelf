import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.inteface';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user;
  loaded: boolean = false;
  isLoggedProfile: boolean = false;

  constructor(
    private autService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
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
        };
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
}

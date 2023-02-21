import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.inteface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private autService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.autService.user;
    this.autService.userSubj.subscribe((user) => {
      this.user = user;
    });
  }

  calcHours() {
    return this.userService.calcHours(this.user);
  }
}

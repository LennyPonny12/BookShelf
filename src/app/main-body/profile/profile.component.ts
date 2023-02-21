import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.inteface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private autService: AuthService) {}

  ngOnInit() {
    this.user = this.autService.user;
    this.autService.userSubj.subscribe((user) => {
      this.user = user;
    });
  }
}

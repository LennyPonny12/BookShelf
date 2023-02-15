import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.inteface';

@Component({
  selector: 'app-headere',
  templateUrl: './headere.component.html',
  styleUrls: ['./headere.component.scss'],
})
export class HeadereComponent {
  user: User = null;

  constructor(private authService: AuthService) {
    authService.userSubj.subscribe((data) => {
      console.log(data);
      this.user = data;
    });
  }
}

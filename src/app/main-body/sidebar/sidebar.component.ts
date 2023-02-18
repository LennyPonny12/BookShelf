import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.inteface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user: User = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userSubj.subscribe((userData) => {
      this.user = userData;
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: any = null;
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.userSubj.subscribe((data) => {
      this.user = data;
    });

    this.user = this.authService.user;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  calcHours() {
    return this.userService.calcHours(this.user);
  }
}

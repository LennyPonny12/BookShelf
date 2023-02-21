import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.inteface';

@Component({
  selector: 'app-headere',
  templateUrl: './headere.component.html',
  styleUrls: ['./headere.component.scss'],
})
export class HeadereComponent implements OnInit, OnDestroy {
  @ViewChild('dropdown') dropdownElement: ElementRef;
  user: User = null;
  dropdown: boolean = false;
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private rendere: Renderer2,
    private router: Router
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

  dropdownFunction() {
    if (this.dropdown === false) {
      this.rendere.addClass(this.dropdownElement.nativeElement, 'show');
      this.dropdown = true;
    } else {
      this.rendere.removeClass(this.dropdownElement.nativeElement, 'show');
      this.dropdown = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['main']);
  }
}

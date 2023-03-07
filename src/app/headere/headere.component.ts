import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
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
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.userSubj.subscribe((data) => {
      this.user = data;
    });
    this.user = this.authService.user;
    this.router.events.subscribe((val: any) => {
      if (val.constructor.name === 'NavigationSkipped') return;

      this.dropdown = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  dropdownFunction() {
    if (!this.dropdown) {
      this.dropdown = true;
      this.changeDetector.detectChanges();
      this.rendere.addClass(this.dropdownElement.nativeElement, 'show');
    } else {
      this.rendere.removeClass(this.dropdownElement.nativeElement, 'show');
      this.dropdown = false;
    }
  }

  logout() {
    this.router.navigate(['main']);
    this.dropdownFunction();
    this.authService.logout();
  }
}

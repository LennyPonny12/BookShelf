import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.inteface';

@Component({
  selector: 'app-headere',
  templateUrl: './headere.component.html',
  styleUrls: ['./headere.component.scss'],
})
export class HeadereComponent implements OnInit {
  @ViewChild('dropdown') dropdownElement: ElementRef;
  user: User = null;
  dropdown: boolean = false;

  constructor(
    private authService: AuthService,
    private rendere: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.userSubj.subscribe((data) => {
      this.user = data;
      this.changeDetector.detectChanges();
    });
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
}

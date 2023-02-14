import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent implements OnInit {
  @ViewChild('popup') popUp: ElementRef;
  logInMode = true;
  authForm: FormGroup;

  constructor(private rendere: Renderer2) {}

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSwitchState() {
    this.logInMode = !this.logInMode;
    this.rendere.addClass(this.popUp.nativeElement, 'popupIn');
    this.rendere.removeClass(this.popUp.nativeElement, 'popCover');

    setTimeout(() => {
      this.rendere.removeClass(this.popUp.nativeElement, 'popupIn');
      this.rendere.addClass(this.popUp.nativeElement, 'popCover');
    }, 2000);
  }

  onSubmit() {
    console.log(this.authForm);
  }
}

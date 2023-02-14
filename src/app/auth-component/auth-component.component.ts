import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent implements OnInit {
  @ViewChild('popup') popUp: ElementRef;
  logInMode = true;
  stateAnimation = false;
  authForm: FormGroup;
  error: string = null;

  constructor(private rendere: Renderer2, private authService: AuthService) {}

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

    if (!this.stateAnimation) {
      this.stateAnimation = true;
      setTimeout(() => {
        this.rendere.removeClass(this.popUp.nativeElement, 'popupIn');
        this.rendere.addClass(this.popUp.nativeElement, 'popCover');
        this.stateAnimation = false;
      }, 2000);
    }
  }

  onSubmit() {
    if (!this.authForm.valid) return;

    let email = this.authForm.value.email;
    let password = this.authForm.value.password;

    if (this.logInMode) {
      this.authService.logIn(email, password).subscribe(
        (resData) => {
          console.log(resData);
        },
        (errorRes) => {
          this.error = this.authService.errorHandlingSingUp(errorRes);
        }
      );
    } else {
      this.authService.singUp(email, password).subscribe(
        (resData) => {
          console.log(resData);
        },
        (errorRes) => {
          this.error = this.authService.errorHandlingSingUp(errorRes);
        }
      );
    }
  }
}

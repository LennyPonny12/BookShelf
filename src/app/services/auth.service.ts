import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  singUp(emial: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvouSiy2UoCp1J5wOptJjLLNqEgZYDkLQ',
      { email: emial, password: password, returnSecureToken: true }
    );
  }

  errorHandlingSingUp(error: any) {
    if (!error.error || !error.error.error) return 'Error occured';

    let message: string;
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'The email address is already in use by another account';
        break;
      case 'OPERATION_NOT_ALLOWED':
        message = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      default:
        message = 'Error occured';
    }
    return message;
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvouSiy2UoCp1J5wOptJjLLNqEgZYDkLQ',
      { email: email, password: password, returnSecureToken: true }
    );
  }
}

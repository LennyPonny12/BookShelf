import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthResponse } from './authResponse';
import { User } from './user.inteface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubj = new Subject<User>();
  user: User = null;
  constructor(private http: HttpClient, private router: Router) {}

  singUp(emial: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvouSiy2UoCp1J5wOptJjLLNqEgZYDkLQ',
      { email: emial, password: password, returnSecureToken: true }
    );
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvouSiy2UoCp1J5wOptJjLLNqEgZYDkLQ',
      { email: email, password: password, returnSecureToken: true }
    );
  }

  handleError(error: any) {
    if (!error.error || !error.error.error) return 'an Error occured';

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
      case 'EMAIL_NOT_FOUND':
        message =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        message =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        message = 'The user account has been disabled by an administrator.';
        break;
      default:
        message = 'Error occured';
    }
    return message;
  }

  databaseCheck(resData: AuthResponse) {
    let user: User;
    this.http
      .get<User>(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${resData.localId.slice(
          0,
          6
        )}/.json`
      )
      .subscribe((data) => {
        user = data;
        if (!user) {
          this.http
            .post<User>(
              `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${resData.localId.slice(
                0,
                6
              )}/.json`,
              {
                email: resData.email,
                username: `User${resData.localId.slice(0, 4)}`,
                imgUrl:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcCpFkOFiN-kJ1BgVgVKqhlCNfjNIeRtZKA&usqp=CAU',
                numberBooks: 0,
                books: [],
              }
            )
            .subscribe((data) => {
              this.http
                .get(
                  `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${resData.localId.slice(
                    0,
                    6
                  )}/.json`
                )
                .subscribe((data) => {
                  this.user = Object.values(data)[0];
                  this.router.navigate(['/..']);
                  this.userSubj.next(this.user);
                });
            });
        } else {
          this.user = Object.values(user)[0];
          this.router.navigate(['/..']);
          this.userSubj.next(this.user);
        }
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { User } from '../interfaces/user.inteface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubj = new Subject<User>();
  user: User = null;
  tokenExpTimer: any;
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
    let experationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );

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
            .put<User>(
              `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${resData.localId.slice(
                0,
                6
              )}/.json`,
              {
                email: resData.email,
                username: `User${resData.localId.slice(0, 4)}`,
                imgUrl:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcCpFkOFiN-kJ1BgVgVKqhlCNfjNIeRtZKA&usqp=CAU',
                books: [],
                reviews: [],
                _id: resData.localId.slice(0, 6),
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
                .subscribe((data: User) => {
                  this.emitUser(data, resData, experationDate);
                });
            });
        } else {
          this.emitUser(user, resData, experationDate);
        }
      });
  }

  emitUser(userData: User, resData, experationDate) {
    this.user = userData;
    this.user._token = resData.idToken;
    this.user._tokenExpiration = experationDate;
    this.router.navigate(['/..']);
    this.userSubj.next(this.user);
    localStorage.setItem('userData', JSON.stringify(this.user));
    this.autoLogout(new Date(experationDate).getTime() - new Date().getTime());
  }

  autoLogin() {
    let userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;

    if (new Date(userData._tokenExpiration).getTime() > new Date().getTime()) {
      this.user = userData;
      this.userSubj.next(this.user);
      this.autoLogout(
        new Date(userData._tokenExpiration).getTime() - new Date().getTime()
      );
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user = null;
    this.userSubj.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) clearTimeout(this.tokenExpTimer);
  }

  checkIsLogged() {
    if (this.user) return true;
    else return false;
  }

  getUser(userId: string) {
    return this.http.get<User>(
      `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${userId}/.json`
    );
  }

  updateUser(user) {
    this.http
      .delete(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${user._id}/.json`
      )
      .subscribe();
    this.http
      .put(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${user._id}/.json`,
        { ...user }
      )
      .subscribe((data) => {
        this.user = {
          ...user,
          _token: this.user._token,
          _tokenExpiration: this.user._tokenExpiration,
        };
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(this.user));
        this.userSubj.next(this.user);
      });
  }

  emitWhenUserUpdates() {
    this.http
      .get<User>(
        `https://bookshelf-1a062-default-rtdb.firebaseio.com/users/${this.user._id}/.json`
      )
      .subscribe((user) => {
        this.user = {
          ...user,
          _token: this.user._token,
          _tokenExpiration: this.user._tokenExpiration,
        };
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(this.user));
        this.userSubj.next(this.user);
      });
  }
}

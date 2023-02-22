import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.inteface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  calcHours(user: User) {
    let hours = 0;
    user.books.forEach((book) => {
      hours += book.timeToRead;
    });
    return hours;
  }
}

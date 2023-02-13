import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  newUser = new Subject<any>();
  user = null;

  logIn() {
    this.user = 'Zalogowany';
  }
}

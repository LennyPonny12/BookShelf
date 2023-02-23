import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BookSerivce } from './services/book.service';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private newService: NewsService,
    private bookService: BookSerivce
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.newService.getNewsReturn().subscribe((data) => {
      let arr = [];
      for (let key in data) {
        arr.push(data[key]);
      }
      this.newService.news.next(arr);
      this.newService.isBlur++;
    });
  }
}

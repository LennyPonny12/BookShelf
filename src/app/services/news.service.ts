import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from './news.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews() {
    return this.http.get(
      'https://bookshelf-1a062-default-rtdb.firebaseio.com/news.json'
    );
  }

  pushNews(news: News) {
    this.http
      .post(`https://bookshelf-1a062-default-rtdb.firebaseio.com/news/.json`, {
        author: news.author,
        date: news.date,
        description: news.description,
        imgUrl: news.imgUrl,
        title: news.title,
      })
      .subscribe();
  }
}

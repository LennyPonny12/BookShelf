import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/services/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  constructor(private newsService: NewsService) {}

  newsList: News[] = [];

  ngOnInit() {
    this.newsService.getNews().subscribe((data: News[]) => {
      for (let news in data) {
        this.newsList.push(data[news]);
      }
    });
  }

  // justpush() {
  //   console.log('tf');
  //   this.newsList.forEach((news) => {
  //     this.http
  //       .post(
  //         `https://bookshelf-1a062-default-rtdb.firebaseio.com/news/.json`,
  //         {
  //           title: news.title,
  //           imgUr: news.imgUrl,
  //           author: news.author,
  //           description: news.description,
  //           date: news.date,
  //         }
  //       )
  //       .subscribe();
  //   });
  // }
}

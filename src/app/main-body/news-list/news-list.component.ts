import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  constructor(private newsService: NewsService) {}

  newsList: News[] = [];
  isBlur = true;

  ngOnInit() {
    this.newsList = this.newsService.getDummyData();
    this.newsService.getNews().subscribe((data: News[]) => {
      let arr = [];
      for (let news in data) {
        arr.push(data[news]);
      }
      this.newsList = arr;
      this.isBlur = false;
    });
  }
}

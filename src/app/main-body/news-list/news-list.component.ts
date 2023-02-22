import { Component, OnInit, OnDestroy } from '@angular/core';
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
  isBlur;

  ngOnInit() {
    this.newsService.news.subscribe((data) => {
      this.newsList = data;
      this.newsService.isBlur++;
      this.isBlur = this.newsService.isBlur;
    });
  }
}

import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss'],
})
export class NewsListItemComponent {
  @Input() news: News;
  @Input() index;
  onHover: boolean = false;
  widthViewport: number;

  @HostListener('window:resize')
  getScreenSize() {
    if (window.innerWidth <= 820) this.widthViewport = window.innerWidth * 2;
    else this.widthViewport = window.innerWidth;
  }

  constructor(private router: Router, private newsService: NewsService) {
    this.getScreenSize();
  }

  onArticle() {
    this.router.navigate(['news', this.index]);
  }

  getNewsDate(date: Date) {
    return this.newsService.getDate(date);
  }
}

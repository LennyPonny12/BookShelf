import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss'],
})
export class NewsListItemComponent {
  @Input() news: News;
  @Input() index;
  onHover: boolean = false;

  constructor(private router: Router) {}

  onArticle() {
    this.router.navigate(['news', this.index]);
  }
}

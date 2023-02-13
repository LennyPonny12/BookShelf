import { Component, Input } from '@angular/core';
import { News } from '../news';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss'],
})
export class NewsListItemComponent {
  @Input() news: News;
  @Input() index;
  onHover: boolean = false;
}

import { Component } from '@angular/core';
import { News } from './news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent {
  newsList: News[] = [
    {
      title: 'Some news',
      content:
        'An sincerity so extremity he additions. Her yet there truth merit. Mrs all projecting favourable now unpleasing. Son law garden chatty temper. Oh children provided to mr elegance marriage strongly. Off can ',
      date: new Date().toLocaleTimeString(),
      imgUrl:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80',
    },
    {
      title: 'Some news',
      content:
        'An sincerity so extremity he additions. Her yet there truth merit. Mrs all projecting favourable now unpleasing. Son law garden chatty temper. Oh children provided to mr elegance marriage strongly. Off can ',
      date: new Date().toLocaleTimeString(),
      imgUrl:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80',
    },
    {
      title: 'Some news',
      content:
        'An sincerity so extremity he additions. Her yet there truth merit. Mrs all projecting favourable now unpleasing. Son law garden chatty temper. Oh children provided to mr elegance marriage strongly. Off can ',
      date: new Date().toLocaleTimeString(),
      imgUrl:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80',
    },
  ];
}

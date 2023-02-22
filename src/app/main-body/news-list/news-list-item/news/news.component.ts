import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: News = {
    author: 'Niklas',
    date: new Date(),
    description:
      ' Certain be ye amiable by exposed so. To celebrated estimating excellence do. Coming either suffer living her gay theirs. Furnished do otherwise daughters contented conveying attempted no. Was yet general visitor present hundred too brother fat arrival. Friend are day own either lively new.  ',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg',
    title: 'lol',
  };

  isBlur = false;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.newsService.getNewsReturn().subscribe((data) => {
      let arr = [];
      for (let key in data) {
        arr.push(data[key]);
      }
      this.isBlur = true;
      this.news = arr[+this.route.snapshot.paramMap.get('id')];
    });
  }
}

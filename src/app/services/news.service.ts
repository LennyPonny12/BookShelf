import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { News } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  news = new BehaviorSubject<News[]>([
    {
      author: 'Niklas',
      date: new Date(),
      description:
        ' Certain be ye amiable by exposed so. To celebrated estimating excellence do. Coming either suffer living her gay theirs. Furnished do otherwise daughters contented conveying attempted no. Was yet general visitor present hundred too brother fat arrival. Friend are day own either lively new.  ',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg',
      title: 'lol',
    },
    {
      author: 'Niklas',
      date: new Date(),
      description:
        ' Certain be ye amiable by exposed so. To celebrated estimating excellence do. Coming either suffer living her gay theirs. Furnished do otherwise daughters contented conveying attempted no. Was yet general visitor present hundred too brother fat arrival. Friend are day own either lively new.  ',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg',
      title: 'lol',
    },
    {
      author: 'Niklas',
      date: new Date(),
      description:
        '. Certain be ye amiable by exposed so. To celebrated estimating excellence do. Coming either suffer living her gay theirs. Furnished do otherwise daughters contented conveying attempted no. Was yet general visitor present hundred too brother fat arrival. Friend are day own either lively new.  ',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg',
      title: 'lol',
    },
  ]);
  isBlur = 0;

  getNews() {
    this.http
      .get('https://bookshelf-1a062-default-rtdb.firebaseio.com/news.json')
      .subscribe((data) => {
        let arr = [];
        for (let key in data) {
          arr.push(data[key]);
        }
        this.news.next(arr);
      });
  }

  getNewsReturn() {
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

  getDate(date) {
    return new Date(date).toLocaleDateString();
  }
}

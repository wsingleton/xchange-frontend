
import { Component, OnInit, NgZone } from '@angular/core';
import { NewsService } from '../news.service'
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  
  loading = true;

  News: any[];
  Articles: any[];
  
  Author: string[];
  Description: string[];
  PublishedAt:  Date[];
  SourceId: string[];
  SourceName: string[];
  Title: string[];
  Url: string[];
  UrlToImage: string[];

  pageNumber: number = 1;

  constructor(private NewsService: NewsService, public ngZone: NgZone){ 

  }

  ngOnInit() {
    this.getNews();
  }

  onScroll() {
    console.log('scrolled!!');

    this.NewsService
    .getNews(this.pageNumber + 1)
    .subscribe((news) => {
      this.News = <any>news;

      // this.Articles.push(this.News["articles"]);
      // console.log()
      console.log(this.Articles);

      if(!_.isNil(this.Articles)){
        this.ngZone.run(()=>{
          this.pageNumber++;
          _.map(this.News["articles"], (a : any) => {
            this.Articles.push(a);
          });
          console.log(this.Articles);
          this.Articles = _.uniqBy(this.Articles, "urlToImage");
          this.loading = false;
        });
      }
    })
  }

  getNews() {
    this.NewsService
    .getNews(this.pageNumber)
    .subscribe((news) => {
      this.News = <any>news;
      this.Articles = this.News["articles"];
      console.log(this.Articles);

      if(!_.isNil(this.Articles)){
        this.ngZone.run(()=>{
          this.loading = false;
        });
      }
    })
  }


}


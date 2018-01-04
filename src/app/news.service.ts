import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable }  from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// Google new API
const sources: string = "financial-post";
const apiKey: string = "77f73964d6884030a622b888eeac3f07";

@Injectable()
export class NewsService {

  p = 1;
  NEWS_API_URL: string = "https://newsapi.org/v2/everything?sources=" + sources + "&page=" + this.p + "&apiKey=" + apiKey;
 
  constructor(private http: HttpClient) { }

  public getNews(pageNumber : number) {
    this.p = pageNumber;
    this.NEWS_API_URL = "https://newsapi.org/v2/everything?sources=" + sources + "&page=" + this.p + "&apiKey=" + apiKey;
    console.log(this.NEWS_API_URL);
    return this.http.get(this.NEWS_API_URL);
  }
    
}

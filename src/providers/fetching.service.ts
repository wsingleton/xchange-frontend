import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// import { environment } from '/Users/wezle/xchange/XChange/src/environments/environment';
import { Stock } from '../model/stock.class';

@Injectable()
export class FetchingService {

  API_URL = "https://www.alphavantage.co/query?";
  API_KEY = "apikey=3EZKM2GLNMIIKI45";
  results: Object[];
  loading: boolean;

  constructor(private http: Http) {
    this.results = [];
    this.loading = false;
  }

  getStockData(apiFunction: string, apiSymbol: string, apiParser: string[], apiInterval?: string) : any {

    let stock: Stock = new Stock();

    if (!apiInterval) {
      //FOR DEBUG: console.log(`${this.API_URL}${apiFunction}&symbol=${apiSymbol}&${this.API_KEY}`);
      // HTTP GET requests to API - for request functions that are NOT Intraday
      console.log(`${this.API_URL}${apiFunction}&symbol=${apiSymbol}&${this.API_KEY}`);
      return this.http.get(`${this.API_URL}${apiFunction}&symbol=${apiSymbol}&${this.API_KEY}`)
        // .subscribe((response) => { 
        //   console.log(response.json());
        //   stock.open = response.json()[apiParser[0]][apiParser[1]]["1. open"];
        //   stock.high = response.json()[apiParser[0]][apiParser[1]]["2. high"];
        //   stock.low = response.json()[apiParser[0]][apiParser[1]]["3. low"];
        //   stock.close = response.json()[apiParser[0]][apiParser[1]]["4. close"];
        //   stock.volume = response.json()[apiParser[0]][apiParser[1]]["5. volume"];
          
        // });
        
    } 
    
    else {
        return this.http.get(`${this.API_URL}${apiFunction}&symbol=${apiSymbol}&${apiInterval}&${this.API_KEY}`);
          // .subscribe((response) => {
          //   this.results = response.json().results;
          //   console.log(this.results["Meta Data"]["1. Information"]);
          //   // resolve();
          // }, 
          // (err) => {
          //   console.log("[LOG] - Request rejected.")
          //   // reject();
          // });
      }
  }
}
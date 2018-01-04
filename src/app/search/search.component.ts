import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FetchingService } from '../../providers/fetching.service';
import { Stock } from '../../model/stock.class';
import { Observable } from 'rxjs/Observable';
import { ParsingService } from '../../providers/parsing.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  functions = [
    { name: "Intraday", apiCall: "function=TIME_SERIES_INTRADAY"},
    { name: "Daily", apiCall: "function=TIME_SERIES_DAILY", forParsing: "Time Series (Daily)"},
    { name: "Weekly", apiCall: "function=TIME_SERIES_WEEKLY", forParsing: "Weekly Time Series"},
    { name: "Monthly", apiCall: "function=TIME_SERIES_MONTHLY", forParsing: "Monthly Time Series"},
    { name: "Daily Adjusted", apiCall: "function=TIME_SERIES_DAILY_ADJUSTED", forParsing: "Time Series(Daily)"},
    { name: "Weekly Adjusted", apiCall: "function=TIME_SERIES_WEEKLY_ADJUSTED", forParsing: "Weekly Adjusted Time Series"},
    { name: "Monthly Adjusted", apiCall: "function=TIME_SERIES_MONTHLY_ADJUSTED", forParsing: "Monthly Adjusted Time Series"}
  ];

  intervals = [
    { name: "1 minute", apiCall: "interval=1min", forParsing: "Time Series (1min)" },
    { name: "5 minute", apiCall: "interval=5min", forParsing: "Time Series (5min)" },
    { name: "15 minute", apiCall: "interval=15min", forParsing: "Time Series (15min)" },
    { name: "30 minute", apiCall: "interval=30min", forParsing: "Time Series (30min)" },
    { name: "60 minute", apiCall: "interval=60min", forParsing: "Time Series (60min)" }
  ];

  apiFunction: string = '';
  apiSymbol: string = '';
  apiInterval: string = '';
  apiParser: string[] = [];

  stock: Stock;

  constructor(private fetchingService: FetchingService, private parsingService: ParsingService) {
    console.log("In ApiTestComponent constructor...");
  }

  search() { 
    this.apiParser = this.parsingService.buildParser(this.apiFunction, this.apiInterval);
    console.log(this.apiParser);
    this.stock = this.fetchingService.getStockData(this.apiFunction, this.apiSymbol, this.apiParser, this.apiInterval);

  }

  ngOnInit() {
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class ParsingService {

  apiParser: string[] = [];

  constructor() { }

  buildParser(apiFunction: string, apiInterval: string): string[] {
    switch(apiFunction) {
      case "function=TIME_SERIES_INTRADAY":
        switch(apiInterval) {
          case "interval=1min":
            this.apiParser[0] = "Time Series (1min)"; break;
          case "interval=5min":
            this.apiParser[0] = "Time Series (5min)"; break;
          case "interval=15min":
            this.apiParser[0] = "Time Series (15min)"; break;
          case "interval=30min":
            this.apiParser[0] = "Time Series (30min)"; break;
          case "interval=60min":
            this.apiParser[0] = "Time Series (60min)"; break;
        }
      case "function=TIME_SERIES_DAILY":
        this.apiParser[0] = "Time Series (Daily)"; 

        let dateRaw = new Date();
        this.apiParser[1] = dateRaw.getFullYear() + "-" + (dateRaw.getMonth() + 1) + "-" + dateRaw.getDate();
        break;

      case "function=TIME_SERIES_WEEKLY":
        this.apiParser[0] = "Weekly Time Series"; break;
      case "function=TIME_SERIES_MONTHLY":
        this.apiParser[0] = "Monthly Time Series"; break;
      case "function=TIME_SERIES_DAILY_ADJUSTED":
        this.apiParser[0] = "Time Series (Daily)"; break;
      case "function=TIME_SERIES_WEEKLY_ADJUSTED":
        this.apiParser[0] = "Weekly Adjusted Time Series"; break;
      case "function=TIME_SERIES_MONTHLY_ADJUSTED":
        this.apiParser[0] = "Monthly Adjusted Time Series"; break;
    }

    return this.apiParser;
  }

}

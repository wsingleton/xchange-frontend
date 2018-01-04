import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { XChangeController } from '../../providers/ers-controller/xchange-controller';
import { Company } from '../../interfaces/xchange-interfaces/interfaces';

import { AlphaVantageService } from '../../providers/alpha-vantage-service.service';
import { FetchingService } from '../../providers/fetching.service';
import { ParsingService } from '../../providers/parsing.service';
import { Stock } from '../../model/stock.class';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ModalContext } from '../listings/listings.component';
import { Subscription } from 'rxjs/Subscription';

import { WatchListSorter } from './watchlist-sorter.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<ModalContext, string, string>

  currentCompany : any = {};
  click_subscription : Subscription;

  loading = true;
  loading_chart = true;

  tableHeader: string = "Watch List";
  options : string[] = [];
  companyList: Company[] = [];

  apiFunction: string = '';
  apiSymbol: string = '';
  apiInterval: string = '';
  apiParser: string[] = [];

  ohlc_outlook = {open: " ", high: " ", low: " ", close: " ", volume: " "};
  ohlc_outlook_type = " ";
  closing_icon_class = "fa fa-arrow-up";
  closing_color_indicator = "black";
  closing_percent = " ";

  fav_icon_color = "#dadada";  
  fav_icon_active_color = "#ffff09";
  fav_icon_inactive_color = "#dadada";
  fav_tooltip_message = " ";

  selectedFunction = "Daily";
  selectedInterval = " ";
  function_options:Array<string> = ["Intraday", "Daily", "Weekly", "Monthly"];
  interval_options:Array<string> = ["1 Minute", "5 Minute", "15 Minute", "30 Minute", "60 Minute"];
  interval_disabled = true;
  option = "hello";

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

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Time Series (Daily)'}
  ];

  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(2, 194, 2, 0.432)',
      borderColor: '#02c202',
      pointBackgroundColor: 'white',
      pointBorderColor: '#02c202',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(
    public xchangeApp : XChangeController, 
    public ngZone : NgZone, 
    public modalService: SuiModalService,
    public alphaVantage: AlphaVantageService, 
    public alphaFetcher: FetchingService, 
    public alphaParser: ParsingService,
    public sorter: WatchListSorter,
    public loginService: LoginService) { 

      console.log(this.loginService.subscribers.getValue().userId);

    forkJoin([
        this.xchangeApp.httpService.GetAllUserFavorites({userId: this.loginService.subscribers.getValue().userId}), 
        this.xchangeApp.httpService.GetAllCompanies()
    ]).subscribe(results => {

      console.log(results);
     
      // let userFavs:any[] = _.filter(results[0], (f:any)=>{if(f.userId == 1) return f});
      console.log();
      console.log();

      if(!_.isNil(results[0]) && results[0].length > 0){

        _.map(results[1], (c:any)=>{
          _.map(results[0], (uf:any)=>{
            if(c.companyId == uf.companyId) this.companyList.push(c);
          });
        });

        this.companyList = _.orderBy(results[0], ["symbol"], ["asc"]);
        this.currentCompany = this.companyList[0];

        _.map(this.companyList, (c : Company)=>{
          this.options.push(c.symbol + " " + c.name);
        });

        this.selectedFunctionEvent("Daily");

        if(!_.isNil(this.companyList)) {
          this.ngZone.run(()=>{
            this.loading = false;
          });
        }

      }
    });
  }

  ngOnInit() {
  }

  public removeFromWatchList(){

    this.ngZone.run(()=>{
      this.loading = true;
      this.loading_chart = true;
    });

    this.xchangeApp.httpService
    .RemoveUserFavorite({userId: this.loginService.subscribers.getValue().userId, companyId: this.currentCompany.companyId})
    .subscribe((results)=>{
      console.log("COMPANY REMOVED FROM WATCHLIST!");
      console.log(results);

      this.ngZone.run(()=>{
        this.loading = false;
        this.loading_chart = false;
        this.companyList = _.filter(this.companyList, (c)=>{
          if(c.name != this.currentCompany.name) return c;
        });
        this.currentCompany = this.companyList[0];
      });
    });
  }

  public removeFromWatchListWithArgs(company:any){

    this.ngZone.run(()=>{
      this.loading = true;
      this.loading_chart = true;
    });

    this.xchangeApp.httpService
    .RemoveUserFavorite({userId: this.loginService.subscribers.getValue().userId, companyId: company.companyId})
    .subscribe((results)=>{
      console.log("COMPANY REMOVED FROM WATCHLIST!");
      console.log(results);

      this.ngZone.run(()=>{
        this.loading = false;
        this.loading_chart = false;
        this.companyList = _.filter(this.companyList, (c)=>{
          if(c.name != company.name) return c;
        });
        this.currentCompany = this.companyList[0];
      });
    });
  }

  public openModal(company : any) {
    this.ngZone.run(()=>{this.loading_chart = true});
    this.currentCompany = company;
    this.apiSymbol = company.symbol;

    const config = new TemplateModalConfig<ModalContext, string, string>(this.modalTemplate);

    config.closeResult = "closed!";
    config.mustScroll = true;
    config.context = { symbol: company.symbol, name: company.name, sector: company.sector, industry: company.industry, isFavorite: true, dataString: JSON.stringify(company)};

    this.selectedInterval = " "; 
    this.interval_disabled = true;
    this.apiFunction = _.filter(this.functions, (f)=>{if(f.name == this.selectedFunction) return f;})[0].apiCall;
    this.apiInterval = null;
    this.apiParser = this.alphaParser.buildParser(this.apiFunction, this.apiInterval);      
    
    //Unsubcribes to previous observables that haven't finished loading
    if(!_.isNil(this.click_subscription)) this.click_subscription.unsubscribe();

    this.click_subscription = this.alphaFetcher.getStockData(this.apiFunction, this.currentCompany.symbol, this.apiParser, this.apiInterval)
    .subscribe((results)=>{

      if(results.json()[this.apiParser[0]][this.apiParser[1]]){
        this.apiParser[1] = moment(this.apiParser[1]).subtract(1, 'days').format("YYYY-MM-DD");
      }
      
      switch(this.selectedFunction){
        case "Daily": this.daily(results); break;
        case "Weekly": this.weekly(results); break;
        case "Monthly": this.monthly(results); break;
      }
    });
  }

  refreshModal(){
    this.selectedFunctionEvent(this.selectedFunction);
  }

  public resultSelected($event : any){
    console.log($event.substring(0, $event.indexOf(" ")));
    
    let company = _.filter(this.companyList, (c)=>{
      if(c.symbol == ($event.substring(0, $event.indexOf(" ")))) return c;
    })[0];

    // this.dismissed();
    this.openModal(company);
  }

  getCurrentDate(){
    return moment().format('MMM Do, YYYY');
  }

  getCurrentTime(){
    return moment().format('hh:mm');
  }

  public daily(results : any){
    this.alphaVantage.processDailyTimeSeries(results, (time_series:any[], chartLabels:any, chartData:any)=>{
      this.avCallBack(time_series, chartLabels, chartData);
    });
  }

  public weekly(results : any){
    this.alphaVantage.processWeeklyTimeSeries(results, (time_series:any[], chartLabels:any, chartData:any)=>{
      this.avCallBack(time_series, chartLabels, chartData);
    });
  }

  public monthly(results : any){
    this.alphaVantage.processMonthlyTimeSeries(results, (time_series:any[], chartLabels:any, chartData:any)=>{
      this.avCallBack(time_series, chartLabels, chartData);
    });
  }

  public avCallBack(time_series:any[], chartLabels:any, chartData:any){
    this.ngZone.run(()=>{
      this.ohlc_outlook.open = time_series[0].open;
      this.ohlc_outlook.high = time_series[0].high;
      this.ohlc_outlook.low = time_series[0].low;
      this.ohlc_outlook.close = time_series[0].close;
      this.ohlc_outlook.volume = time_series[0].volume;

      this.ohlc_outlook_type = " for the day of " + moment(time_series[0].key).format("MMM Do, YYYY");
      this.closing_percent = "(" + (((parseFloat(time_series[1].close) - parseFloat(time_series[0].close)) / parseFloat(time_series[1].close)) * -100).toFixed(2) + "%)";

      if(this.ohlc_outlook.close > this.ohlc_outlook.open){
        this.closing_icon_class = "fa fa-arrow-up";
        this.closing_color_indicator = "rgb(2, 194, 2)";
      }else{
        this.closing_icon_class = "fa fa-arrow-down";
        this.closing_color_indicator = "rgb(212, 27, 27)";
      }

      this.lineChartLabels = chartLabels;
      this.lineChartData[0].data = chartData;
      this.loading_chart = false;
    });
  }

  public selectedFunctionEvent($event : any){
    if($event == "Intraday") {this.ngZone.run(()=>{this.interval_disabled = false});}
    else if($event != "Intraday"){
      this.ngZone.run(()=>{this.loading_chart = true});
      this.selectedInterval = " "; 
      this.interval_disabled = true;
      this.apiFunction = _.filter(this.functions, (f)=>{if(f.name == this.selectedFunction) return f;})[0].apiCall;
      this.apiInterval = null;
      this.apiParser = this.alphaParser.buildParser(this.apiFunction, this.apiInterval);      
      this.alphaFetcher.getStockData(this.apiFunction, this.currentCompany.symbol, this.apiParser, this.apiInterval)
      .subscribe((results)=>{
        console.log(results.json());
        // results = results.json();
        if(results.json()[this.apiParser[0]][this.apiParser[1]]) this.apiParser[1] = moment(this.apiParser[1]).subtract(1, 'days').format("YYYY-MM-DD");

        console.log("$event: " + $event);
        console.log($event == "Weekly");
        if($event == "Daily"){this.daily(results);}
        else if($event == "Weekly"){ this.weekly(results);}
        else if($event == "Monthly"){ console.log("YOOO"); this.monthly(results);}
      });
    }

    this.selectedFunction = $event;
    console.log(this.interval_disabled);
    console.log(this.selectedFunction);
  }
  
  public selectedIntervalEvent($event : any){
    this.ngZone.run(()=>{this.loading_chart = true});
    this.selectedInterval = $event;
    this.apiFunction = _.filter(this.functions, (f)=>{if(f.name == this.selectedFunction) return f;})[0].apiCall;
    this.apiInterval = _.filter(this.intervals, (i)=>{if(i.name == _.lowerCase(this.selectedFunction)) return i;})[0].apiCall;
    this.apiParser = this.alphaParser.buildParser(this.apiFunction, this.apiInterval);      

    console.log(this.selectedInterval);
  }

  sort(op?:any){
    this.sorter.sort(op, (column:string, order:string)=>{
      this.ngZone.run(()=>{
            this.companyList = _.orderBy(this.companyList, [column], [order]);
          });
    });
  }
}

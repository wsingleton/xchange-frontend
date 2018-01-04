
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { XChangeController } from '../../providers/ers-controller/xchange-controller';
import { Company } from '../../interfaces/xchange-interfaces/interfaces';
import { FetchingService } from '../../providers/fetching.service';
import { ParsingService } from '../../providers/parsing.service';
import { Stock } from '../../model/stock.class';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ModalContext } from '../listings/listings.component';
import { MatTabChangeEvent } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})

export class SubscriptionsComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<ModalContext, string, string>

  users:any[];
  subscriptions:any[];
  subscribers:any[];

  currentUser:any = {};

  currentCompany : any = {};
  click_subscription : Subscription;

  loading = true;
  loading_chart = true;

  symbol_asc = true;
  symbol_desc = false;
  symbol_left = "15px";
  symbol_top = "20px";

  exchange_asc = false;
  exchange_desc = false;
  exchange_left = "20px";
  exchange_top = "25px";

  name_asc = false;
  name_desc = false;
  name_left = "10px";
  name_top = "25px";

  sector_asc = false;
  sector_desc = false;
  sector_left = "10px";
  sector_top = "25px";

  industry_asc = false;
  industry_desc = false;
  industry_left = "10px";
  industry_top = "25px";

  tableHeader: string = "Subscriptions";
  options : string[] = [];
  companyList: Company[];

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

  apiFunction: string = '';
  apiSymbol: string = '';
  apiInterval: string = '';
  apiParser: string[] = [];

  stock: Stock = new Stock();

  ohlc_outlook = {open: " ", high: " ", low: " ", close: " ", volume: " "};
  ohlc_outlook_type = " ";
  closing_icon_class = "fa fa-arrow-up";
  closing_color_indicator = "black";
  closing_percent = " ";

  fav_icon_color = "#dadada";  
  fav_icon_active_color = "#ffff09";
  fav_icon_inactive_color = "#dadada";
  fav_tooltip_message = " ";

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
    public alphaFetcher: FetchingService, 
    public alphaParser: ParsingService,
    public loginService: LoginService) { 

    this.companyList = [];

    forkJoin([
        this.xchangeApp.httpService.GetAllUsers(), 
        this.xchangeApp.httpService.GetAllCompanies()
    ]).subscribe(results => {

      this.users = results[0];

      // _.map(this.users, (u)=>{
      //   this.options.push(u.firstName + " " + u.lastName + " (@" + u.username + ")");
      // });

      let userFavs:any[] = _.filter(results[0], (f:any)=>{if(f.userID == 1000000000) return f});

      _.map(results[1], (c:any)=>{
        _.map(userFavs, (uf:any)=>{
          if(c.companyID == uf.company) this.companyList.push(c);
        });
      });

      console.log(results);
      this.currentCompany = results[1][0];

      console.log(this.companyList);

      this.selectedInterval = " "; 
      this.interval_disabled = true;
      this.apiFunction = _.filter(this.functions, (f)=>{if(f.name == this.selectedFunction) return f;})[0].apiCall;
      this.apiInterval = null;
      this.apiParser = this.alphaParser.buildParser(this.apiFunction, this.apiInterval); 

      this.alphaFetcher.getStockData(this.apiFunction, this.currentCompany.symbol, this.apiParser, this.apiInterval)
      .subscribe((results)=>{
        console.log(this.apiParser[1]);
        console.log(results.json()[this.apiParser[0]]);
  
        if(results.json()[this.apiParser[0]][this.apiParser[1]]) this.apiParser[1] = moment(this.apiParser[1]).subtract(1, 'days').format("YYYY-MM-DD");
        
        this.daily(results);
      });

      if(!_.isNil(this.companyList)) {
        this.ngZone.run(()=>{
          this.loading = false;
        });
      }
    });
  }

  ngOnInit() {}

  tabChanged(tabChangeEvent: MatTabChangeEvent){
    this.ngZone.run(()=>{
      this.loading = true;
    });

    console.log(tabChangeEvent.index);
    switch(tabChangeEvent.index){
      case 1: this.initSubscriptions(); break;
      case 2: this.initSubscribers(); break;
    }
  }

  initSubscriptions(){
    this.xchangeApp.httpService
    .GetAllUserSubscriptions({userId: this.loginService.subscribers.getValue().userId})
    .subscribe((results)=>{
      console.log(results);
      this.ngZone.run(()=>{
        this.subscriptions = _.orderBy(results, ["username"], ["asc"]);
        this.currentUser = this.subscriptions[0];
        this.options = [];        
        _.map(this.subscriptions, (u)=>{
          this.options.push(u.firstName + " " + u.lastName + " (@" + u.username + ")");
        });
        this.loading = false;
      });
    });
  }

  initSubscribers(){
    this.xchangeApp.httpService
    .GetAllUserSubscribers({userId: this.loginService.subscribers.getValue().userId})
    .subscribe((results)=>{
      console.log(results);
      this.ngZone.run(()=>{
        this.subscribers = _.orderBy(results, ["username"], ["asc"]);
        this.currentUser = this.subscribers[0];        
        this.options = [];
        _.map(this.subscribers, (u)=>{
          this.options.push(u.firstName + " " + u.lastName + " (@" + u.username + ")");
        });
        this.loading = false;
      });
    });
  }

  toggleFavorite(){
    if(this.fav_icon_color == this.fav_icon_active_color){
     this.fav_icon_color = this.fav_icon_inactive_color;
     this.fav_tooltip_message = "Add " + this.currentCompany.name + " to your Watch List";
    }else if(this.fav_icon_color == this.fav_icon_inactive_color){
       this.fav_icon_color = this.fav_icon_active_color;
       this.fav_tooltip_message = "Remove " + this.currentCompany.name + " from your Watch List";
    }
  }

  public openModal(company : any) {

    this.currentCompany =  {
      "companyID": 1000006382,
      "exchange": "AMEX",
      "symbol": "CRVP",
      "name": "Crystal Rock Holdings, Inc.",
      "sector": "Consumer Non-Durables",
      "industry": "Food Distributors"
    };

    this.clearOHLC();
    this.ngZone.run(()=>{this.loading_chart = true});
    // this.alphaFetcher.getStockData(this.apiFunction, this.apiSymbol, this.apiParser, this.apiInterval);
    this.apiSymbol = company.symbol;
    const config = new TemplateModalConfig<ModalContext, string, string>(this.modalTemplate);

    config.closeResult = "closed!";
    // config.transition = "fade up";
    config.mustScroll = true;
    config.context = { symbol: company.symbol, name: company.name, sector: company.sector, industry: company.industry, isFavorite: false, dataString: JSON.stringify(company)};

    this.selectedInterval = " "; 
    this.interval_disabled = true;
    this.apiFunction = _.filter(this.functions, (f)=>{if(f.name == this.selectedFunction) return f;})[0].apiCall;
    this.apiInterval = null;
    this.apiParser = this.alphaParser.buildParser(this.apiFunction, this.apiInterval);      
    
    if(!_.isNil(this.click_subscription)) this.click_subscription.unsubscribe();
    
    this.click_subscription = this.alphaFetcher.getStockData(this.apiFunction, this.currentCompany.symbol, this.apiParser, this.apiInterval)
    .subscribe((results)=>{
      console.log(this.apiParser[1]);
      console.log(results.json()[this.apiParser[0]]);

      if(results.json()[this.apiParser[0]][this.apiParser[1]]) this.apiParser[1] = moment(this.apiParser[1]).subtract(1, 'days').format("YYYY-MM-DD");
      
      this.daily(results);
    });

    // this.modalService
    //     .open(config)
    //     .onApprove(result => { /* approve callback */ })
    //     .onDeny(result => { this.dismissed()});
  }

  refreshModal(){
    // this.ngZone.run(()=>{this.loading_chart = true});
    this.selectedFunctionEvent(this.selectedFunction);
  }

  public dismissed(){
    this.selectedFunction = "Daily";
  }

  public resultSelected($event : any){
    this.clearOHLC();
    console.log($event.substring(0, $event.indexOf(" ")));
    
    let company = _.filter(this.companyList, (c)=>{
      if(c.symbol == ($event.substring(0, $event.indexOf(" ")))) return c;
    })[0];

    this.openModal(company);
  }

  getCurrentDate(){
    return moment().format('MMM Do, YYYY');
  }

  getCurrentTime(){
    return moment().format('hh:mm');
  }

  public daily(results : any){
    this.clearOHLC();
    let time_series : any[] = [];
    Object.getOwnPropertyNames(results.json()["Time Series (Daily)"])
    .map((key: string) => {time_series.push({
      key: key, 
      open: parseFloat(results.json()["Time Series (Daily)"][key]["1. open"]).toFixed(2),
      high: parseFloat(results.json()["Time Series (Daily)"][key]["2. high"]).toFixed(2),
      low: parseFloat(results.json()["Time Series (Daily)"][key]["3. low"]).toFixed(2),
      close: parseFloat(results.json()["Time Series (Daily)"][key]["4. close"]).toFixed(2),
      volume: results.json()["Time Series (Daily)"][key]["5. volume"]});});
    
    let labels:any[] = [];
    let data:any[] = [];

    for(let i = 6; i >= 0; i--){
      labels.push(moment(time_series[i].key).format("ddd"));
      console.log(parseFloat(time_series[i].close).toFixed(2));
      data.push(parseFloat(time_series[i].close));
    }

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

      this.lineChartLabels = labels;
      this.lineChartData[0].data = data;
      this.loading_chart = false;
    });
  }

  public weekly(results : any){
    this.clearOHLC();
    let time_series : any[] = [];
    Object.getOwnPropertyNames(results.json()["Weekly Time Series"])
    .map((key: string) => {time_series.push({
      key: key, 
      open: parseFloat(results.json()["Weekly Time Series"][key]["1. open"]).toFixed(2),
      high: parseFloat(results.json()["Weekly Time Series"][key]["2. high"]).toFixed(2),
      low: parseFloat(results.json()["Weekly Time Series"][key]["3. low"]).toFixed(2),
      close: parseFloat(results.json()["Weekly Time Series"][key]["4. close"]).toFixed(2)});});
    
    let labels:any[] = [];
    let data:any[] = [];

    for(let i = 7; i >= 0; i--){
      labels.push(moment(time_series[i].key).format("MM/DD"));
      data.push(parseFloat(time_series[i].close));
    }

    this.ngZone.run(()=>{
      this.lineChartLabels = labels;
      this.lineChartData[0].data = data;
      this.loading_chart = false;
    });
  }

  public monthly(results : any){
    this.ngZone.run(()=> this.clearOHLC());

    let time_series : any[] = [];
    Object.getOwnPropertyNames(results.json()["Monthly Time Series"])
    .map((key: string) => {time_series.push({
      key: key, 
      open: parseFloat(results.json()["Monthly Time Series"][key]["1. open"]).toFixed(2),
      high: parseFloat(results.json()["Monthly Time Series"][key]["2. high"]).toFixed(2),
      low: parseFloat(results.json()["Monthly Time Series"][key]["3. low"]).toFixed(2),
      close: parseFloat(results.json()["Monthly Time Series"][key]["4. close"]).toFixed(2)});});
    
    let labels:any[] = [];
    let data:any[] = [];

    for(let i = 11; i >= 0; i--){
      labels.push(moment(time_series[i].key).format("MMM/YYYY"));
      data.push(parseFloat(time_series[i].close));
    }

    this.ngZone.run(()=>{
      this.lineChartLabels = labels;
      this.lineChartData[0].data = data;
      this.loading_chart = false;
    });
  }

  public selectedFunctionEvent($event : any){
    if($event == "Intraday") {this.ngZone.run(()=>{this.interval_disabled = false});}
    else if($event != "Intraday"){
      this.ngZone.run(()=> {this.clearOHLC();});
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

  //This is disgusting
  sort(op? : any){
    console.log(op);
    if(op == "symbol"){
      if(this.symbol_asc == true 
         || (this.symbol_asc == false 
          && this.symbol_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = false;
          this.symbol_desc = true;
          this.exchange_asc = false;
          this.exchange_desc = false;
          this.name_asc = false;
          this.name_desc = false;
          this.sector_asc = false;
          this.sector_desc = false;
          this.industry_asc = false;
          this.industry_desc = false;

          this.symbol_left = "15px";
          this.symbol_top = "20px";
          this.exchange_left = "20px";
          this.exchange_top = "25px";
          this.name_left = "10px";
          this.name_top = "25px";
          this.sector_left = "10px";
          this.sector_top = "25px";
          this.industry_left = "10px";
          this.industry_top = "25px";

          this.doSort(op, "desc");
        });
      }else if(this.symbol_desc == true || (this.symbol_asc == false && this.symbol_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = true;
          this.symbol_desc = false;
          this.exchange_asc = false;
          this.exchange_desc = false;
          this.name_asc = false;
          this.name_desc = false;
          this.sector_asc = false;
          this.sector_desc = false;
          this.industry_asc = false;
          this.industry_desc = false;

          this.symbol_left = "15px";
          this.symbol_top = "20px";
          this.exchange_left = "20px";
          this.exchange_top = "25px";
          this.name_left = "10px";
          this.name_top = "25px";
          this.sector_left = "10px";
          this.sector_top = "25px";
          this.industry_left = "10px";
          this.industry_top = "25px";

          this.doSort(op, "asc");           

        });
      }
    }else if(op == "exchange"){
      if(this.exchange_asc == true || (this.exchange_asc == false && this.exchange_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = false;
          this.symbol_desc = false;
          this.exchange_asc = false;
          this.exchange_desc = true;
          this.name_asc = false;
          this.name_desc = false;
          this.sector_asc = false;
          this.sector_desc = false;
          this.industry_asc = false;
          this.industry_desc = false;

          this.symbol_left = "15px";
          this.symbol_top = "25px";
          this.exchange_left = "20px";
          this.exchange_top = "20px";
          this.name_left = "10px";
          this.name_top = "25px";
          this.sector_left = "10px";
          this.sector_top = "25px";
          this.industry_left = "10px";
          this.industry_top = "25px";

          this.doSort(op, "desc");           

        });
      }else if(this.exchange_desc == true || (this.exchange_asc == false && this.exchange_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = false;
          this.symbol_desc = false;
          this.exchange_asc = true;
          this.exchange_desc = false;
          this.name_asc = false;
          this.name_desc = false;
          this.sector_asc = false;
          this.sector_desc = false;
          this.industry_asc = false;
          this.industry_desc = false;

          this.symbol_left = "15px";
          this.symbol_top = "25px";
          this.exchange_left = "20px";
          this.exchange_top = "20px";
          this.name_left = "10px";
          this.name_top = "25px";
          this.sector_left = "10px";
          this.sector_top = "25px";
          this.industry_left = "10px";
          this.industry_top = "25px";

          this.doSort(op, "asc");           

        });
      }
    }else if(op == "name"){
      if(this.name_asc == true || (this.name_asc == false && this.name_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = false;
          this.symbol_desc = false;
          this.exchange_asc = false;
          this.exchange_desc = false;
          this.name_asc = false;
          this.name_desc = true;
          this.sector_asc = false;
          this.sector_desc = false;
          this.industry_asc = false;
          this.industry_desc = false;

          this.symbol_left = "15px";
          this.symbol_top = "25px";
          this.exchange_left = "20px";
          this.exchange_top = "25px";
          this.name_left = "10px";
          this.name_top = "20px";
          this.sector_left = "10px";
          this.sector_top = "25px";
          this.industry_left = "10px";
          this.industry_top = "25px";

          this.doSort(op, "desc");           

        });
      }else if(this.name_desc == true || (this.name_asc == false && this.name_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = false;
          this.symbol_desc = false;
          this.exchange_asc = false;
          this.exchange_desc = false;
          this.name_asc = true;
          this.name_desc = false;
          this.sector_asc = false;
          this.sector_desc = false;
          this.industry_asc = false;
          this.industry_desc = false;

          this.symbol_left = "15px";
          this.symbol_top = "25px";
          this.exchange_left = "20px";
          this.exchange_top = "25px";
          this.name_left = "10px";
          this.name_top = "20px";
          this.sector_left = "10px";
          this.sector_top = "25px";
          this.industry_left = "10px";
          this.industry_top = "25px";

          this.doSort(op, "asc");           

        });
      }
    }else if(op == "sector"){
      if(this.sector_asc == true || (this.sector_asc == false && this.sector_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = false;
          this.symbol_desc = false;
          this.exchange_asc = false;
          this.exchange_desc = false;
          this.name_asc = false;
          this.name_desc = false;
          this.sector_asc = false;
          this.sector_desc = true;
          this.industry_asc = false;
          this.industry_desc = false;

          this.symbol_left = "15px";
          this.symbol_top = "25px";
          this.exchange_left = "20px";
          this.exchange_top = "25px";
          this.name_left = "10px";
          this.name_top = "25px";
          this.sector_left = "10px";
          this.sector_top = "20px";
          this.industry_left = "10px";
          this.industry_top = "25px";

          this.doSort(op, "desc");           

        });
      }else if(this.sector_desc == true || (this.sector_asc == false && this.sector_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = false;
          this.symbol_desc = false;
          this.exchange_asc = false;
          this.exchange_desc = false;
          this.name_asc = false;
          this.name_desc = false;
          this.sector_asc = true;
          this.sector_desc = false;
          this.industry_asc = false;
          this.industry_desc = false;

          this.symbol_left = "15px";
          this.symbol_top = "25px";
          this.exchange_left = "20px";
          this.exchange_top = "25px";
          this.name_left = "10px";
          this.name_top = "25px";
          this.sector_left = "10px";
          this.sector_top = "20px";
          this.industry_left = "10px";
          this.industry_top = "25px";

          this.doSort(op, "asc");           

        });
      }
    }else if(op == "industry"){
      if(this.industry_asc == true || (this.industry_asc == false && this.industry_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = false;
          this.symbol_desc = false;
          this.exchange_asc = false;
          this.exchange_desc = false;
          this.name_asc = false;
          this.name_desc = false;
          this.sector_asc = false;
          this.sector_desc = false;
          this.industry_asc = false;
          this.industry_desc = true;

          this.symbol_left = "15px";
          this.symbol_top = "25px";
          this.exchange_left = "20px";
          this.exchange_top = "25px";
          this.name_left = "10px";
          this.name_top = "25px";
          this.sector_left = "10px";
          this.sector_top = "25px";
          this.industry_left = "10px";
          this.industry_top = "20px";

          this.doSort(op, "desc");           

        });
      }else if(this.industry_desc == true || (this.industry_asc == false && this.industry_desc == false)){
        this.ngZone.run(()=>{
          this.symbol_asc = false;
          this.symbol_desc = false;
          this.exchange_asc = false;
          this.exchange_desc = false;
          this.name_asc = false;
          this.name_desc = false;
          this.sector_asc = false;
          this.sector_desc = false;
          this.industry_asc = true;
          this.industry_desc = false;

          this.symbol_left = "15px";
          this.symbol_top = "25px";
          this.exchange_left = "20px";
          this.exchange_top = "25px";
          this.name_left = "10px";
          this.name_top = "25px";
          this.sector_left = "10px";
          this.sector_top = "25px";
          this.industry_left = "10px";
          this.industry_top = "20px";

          this.doSort(op, "asc");           

        });
      }
    }
  }

  doSort(column : string, order : string){
    this.ngZone.run(()=>{
      this.companyList = _.orderBy(this.companyList, [column], [order]);
    });
  }

  alert(a : any){
    console.log(a);
  }

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public clearOHLC(){
    // this.ohlc_outlook.open = "N/A";
    // this.ohlc_outlook.high = "N/A";
    // this.ohlc_outlook.low = "N/A";
    // this.ohlc_outlook.close = "N/A";
  }

}

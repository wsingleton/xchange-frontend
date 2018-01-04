import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class AlphaVantageService {

    public processDailyTimeSeries(results : any, callback:(time_series:any[], chartLabels:any, chartData:any)=>any){
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
          data.push(parseFloat(time_series[i].close));
        }

        callback(time_series, labels, data);
    }

    public processWeeklyTimeSeries(results : any, callback:(time_series:any[], chartLabels:any, chartData:any)=>any){
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

        callback(time_series, labels, data);
    }

    public processMonthlyTimeSeries(results : any, callback:(time_series:any[], chartLabels:any, chartData:any)=>any){
    
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

        callback(time_series, labels, data);
    }
}
import { Injectable, ComponentFactory, ComponentFactoryResolver, EventEmitter, ErrorHandler } from '@angular/core';

@Injectable()
export class WatchListSorter {

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

    constructor(){}

    sort(op : any, doSort:(column:string, order:string)=>any){
        console.log(op);
        if(op == "symbol"){
            if(this.symbol_asc == true 
                || (this.symbol_asc == false 
                && this.symbol_desc == false)){
            // //this.ngZone.run(()=>{
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

                doSort(op, "desc");
            // });
            }else if(this.symbol_desc == true || (this.symbol_asc == false && this.symbol_desc == false)){
            // //this.ngZone.run(()=>{
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

                doSort(op, "asc");           

            // });
            }
        }else if(op == "exchange"){
            if(this.exchange_asc == true || (this.exchange_asc == false && this.exchange_desc == false)){
            //this.ngZone.run(()=>{
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

                doSort(op, "desc");           

            // });
            }else if(this.exchange_desc == true || (this.exchange_asc == false && this.exchange_desc == false)){
            ////this.ngZone.run(()=>{
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

                doSort(op, "asc");           

            // });
            }
        }else if(op == "name"){
            if(this.name_asc == true || (this.name_asc == false && this.name_desc == false)){
            //this.ngZone.run(()=>{
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

                doSort(op, "desc");           

            // });
            }else if(this.name_desc == true || (this.name_asc == false && this.name_desc == false)){
            //this.ngZone.run(()=>{
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

                doSort(op, "asc");           

            // });
            }
        }else if(op == "sector"){
            if(this.sector_asc == true || (this.sector_asc == false && this.sector_desc == false)){
            //this.ngZone.run(()=>{
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

                doSort(op, "desc");           

            // });
            }else if(this.sector_desc == true || (this.sector_asc == false && this.sector_desc == false)){
            //this.ngZone.run(()=>{
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

                doSort(op, "asc");           

            // });
            }
        }else if(op == "industry"){
            if(this.industry_asc == true || (this.industry_asc == false && this.industry_desc == false)){
            //this.ngZone.run(()=>{
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

                doSort(op, "desc");           

            // });
            }else if(this.industry_desc == true || (this.industry_asc == false && this.industry_desc == false)){
            //this.ngZone.run(()=>{
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

                doSort(op, "asc");           

            // });

            }
        }
    }

}
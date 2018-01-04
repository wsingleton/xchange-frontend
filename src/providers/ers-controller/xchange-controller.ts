import { Injectable, ComponentFactory, ComponentFactoryResolver, EventEmitter, ErrorHandler } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpService } from "../http-service/xchange-http.service";
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import * as _ from 'lodash';
import * as moment from 'moment';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../../app/login.service';

@Injectable()
export class XChangeController {

    public httpService: HttpService;
    public currentUser : any;

    constructor(public http: Http, public router: Router, public snackBar: MatSnackBar, public loginService: LoginService){
        this.initProviders();
    }

    initProviders() {
        this.httpService = new HttpService(this.http);
    }

    public getAllUsers(){
        this.httpService.GetAllUsers().subscribe(
            (data) => {
                console.log("GET ALL USERS >>");
                console.log(data);
            }, () => {console.log("ERROR: COULD NOT GET USERS");}
        )
    }

    // public getAllUserSubscriptions(){
    //     this.httpService.GetAllUserSubscriptions().subscribe(
    //         (data) => {
    //             console.log("GET ALL SUBSCRIPTIONS >>");
    //             console.log(data);
    //         }, () => {console.log("ERROR: COULD NOT GET SUBSCRIPTIONS");}
    //     )
    // }

    public getAllUserFavorites(){
        console.log(this.loginService.subscribers.getValue().userId);
        this.httpService.GetAllUserFavorites({userId: this.loginService.subscribers.getValue().userId}).subscribe(
            (data) => {
                console.log("GET ALL FAVORITES >>");
                console.log(data);
            }, () => {console.log("ERROR: COULD NOT GET FAVORITES");}
        )
    }

    public getAllCompanies(){
        return this.httpService.GetAllCompanies();
    }
}

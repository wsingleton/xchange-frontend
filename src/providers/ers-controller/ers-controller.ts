import { Injectable, ComponentFactory, ComponentFactoryResolver, EventEmitter, ErrorHandler } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpService } from "../http-service/http-service";
import { ReimbursementRequest, ReimbursementStatus, ReimbursementType } from '../../interfaces/model/model.interfaces'
import { ReimbursementRequestBundle } from '../../interfaces/app/app.interfaces';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import * as _ from 'lodash';
import * as moment from 'moment';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ERSController {

    public httpService: HttpService;
    public currentUser : any;
    public users : any[];
    public reimbursementTypes : ReimbursementType[];
    public reimbursementStatus : ReimbursementStatus[];
    public reimbursementRequests : ReimbursementRequest[];
    public reimbursementRequestsBundle : ReimbursementRequestBundle[];
    public showModalBool = false;
    public submittedRequest : ReimbursementRequest;
    public submittedDecision : ReimbursementRequest;

    constructor(public http: Http, public router: Router, public snackBar: MatSnackBar){
        this.initProviders();
        // this.currentUser = {firstname: "Jon", lastName: "Doe"};
    }

    initProviders() {
        this.httpService = new HttpService(this.http);
    }

    public loginEmployee(uname:string, pword:string, promise:Function, errorToast?:Function){
        this
        .httpService
        .Login({username: uname, password: pword})
        .subscribe(
            (data: any) => {
                if(data != null && data != undefined){
                  this.currentUser = data;
                  if(this.currentUser.userRoleId != 1000000000){
                    this.snackBar.open("Employee not found. Please try again.", "OK", {
                        duration: 2000
                    });
                  }else{
                    promise();
                  }
                }
            },
            (error) => {
                if(this.currentUser == null || this.currentUser == undefined){
                    this.snackBar.open("Employee not found. Please try again.", "OK", {
                        duration: 2000
                    });
                }
            }
        );
    }

    public loginManager(uname:string, pword:string, promise:Function, errorToast?:Function){
        this
        .httpService
        .Login({username: uname, password: pword})
        .subscribe(
            (data: any) => {
                if(data != null && data != undefined){
                  this.currentUser = data;
                  if(this.currentUser.userRoleId != 1000000001){
                    this.snackBar.open("Manager not found. Please try again.", "OK", {
                        duration: 2000
                    });
                  }else{
                    promise();
                  }
                }
            }, (error) => {
                if(this.currentUser == null || this.currentUser == undefined){
                    this.snackBar.open("Manager not found. Please try again.", "OK", {
                        duration: 2000
                    });
                }
            }
        );
    }

    public initializeEmployee(e:EventEmitter<any>){
        forkJoin([
            this.httpService.GetAllUsers(), 
            this.httpService.GetAllUserRoles(),
            this.httpService.GetUserByID({userId: this.currentUser.userId}),
            this.httpService.GetUserRoleByID({userRoleId: this.currentUser.userId}),
            this.httpService.GetAllReimbursementRequestsByAuthorID({reimbursementAuthorId: this.currentUser.userId}),
            this.httpService.GetAllReimbursementStatus(),
            this.httpService.GetAllReimbursementTypes()
        ]).subscribe(results => {
            this.reimbursementRequests = results[4];
            this.reimbursementStatus = results[5];
            this.reimbursementTypes = results[6];
            this.router.navigate(["dashboard"]);
            setTimeout(()=>{this.snackBar.open("Hello " + this.currentUser.firstName + "!", "", {
                duration: 3000
            })}, 1200);
        });
    }

    public initializeManager(e:EventEmitter<any>){
        forkJoin([
            this.httpService.GetAllUsers(), 
            this.httpService.GetAllUserRoles(),
            this.httpService.GetUserByID({userId: this.currentUser.userId}),
            this.httpService.GetUserRoleByID({userRoleId: this.currentUser.userId}),
            this.httpService.GetAllReimbursementRequests(),
            this.httpService.GetAllReimbursementStatus(),
            this.httpService.GetAllReimbursementTypes()
        ]).subscribe(results => {
            this.users = results[0];
            this.reimbursementRequests = results[4];
            this.reimbursementStatus = results[5];
            this.reimbursementTypes = results[6];
            this.router.navigate(["dashboard/manager"]);
            setTimeout(()=>{this.snackBar.open("Hello " + this.currentUser.firstName + "!", "", {
                duration: 3000
            })}, 1200);
        });
    }

    public addNewUser($requestBody : {}){
        return this
        .httpService
        .AddNewUser($requestBody);
    }

    public GetAllUsers(){
        this
        .httpService
        .GetAllUsers()
        .subscribe(
            (data: any) => { this.users = data; },
            (error) => { }
        );
    }

    public GetAllRoles(){
        return this
        .httpService
        .GetAllUserRoles();
    }

    public GetAllRequests() : any {
        return this
        .httpService
        .GetAllReimbursementRequests()
    }

    public GetAllReimbursementStatus(){
        this
        .httpService
        .GetAllReimbursementStatus()
        .subscribe(
            (data: any) => { this.reimbursementStatus = data; },
            (error) => { }
        );
    }
    
    public GetAllReimbursementTypes(){
        this
        .httpService
        .GetAllReimbursementTypes()
        .subscribe(
            (data: any) => { this.reimbursementTypes = data; },
            (error) => { }
        );
    }

    public updateReimbursementRequest($requestBody:{}){
        return this
        .httpService
        .UpdateReimbursementRequest($requestBody);
    }

    public SubmitReimbursementRequest($requestBody:{}, e:EventEmitter<any>) : any {
        this
        .httpService
        .SubmitReimbursementRequest($requestBody)
        .subscribe(
            (data: any) => {
                data.reimbursementSubmitted = moment().format('YYYY-MM-DD h:mm:ss');
                this.reimbursementRequests.push(data);
                
                e.emit();

                this.showModalBool = true;
                this.submittedRequest = data;
            },
            (error) => { }
        );
    }
    
    public GetAllReimbursementRequests() : any {
        this
        .httpService
        .GetAllReimbursementRequests()
        .subscribe(
            (data: any) => { this.reimbursementRequests = data; },
            (error) => { }
        );
    }

    public GetAllReimbursementRequestsByAuthorID($requestBody:{}) : any {
        this
        .httpService
        .GetAllReimbursementRequestsByAuthorID($requestBody)
        .subscribe(
            (data: any) => { this.reimbursementRequests = data; },
            (error) => { }
        );
    }

    public getLastSubmittedRequest() : ReimbursementRequest{
        return this.submittedRequest;
    }
}

import { Component, EventEmitter, Input, AfterViewChecked, OnInit, Inject, NgZone, Output} from '@angular/core';
import * as Mock from '../../../mock/reimbursements.mock';
import { ReimbursementRequest, ReimbursementStatus, ReimbursementType, User } from '../../../interfaces/model/model.interfaces';
import { ReimbursementRequestBundle } from '../../../interfaces/app/app.interfaces';
import { MaterializeAction } from 'angular2-materialize';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ERSController } from '../../../providers/ers-controller/ers-controller';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'page-pending-requests-manager',
  templateUrl: 'pending-requests-manager.html'
}) export class PendingRequestsManagerPage implements OnInit, AfterViewChecked{

  currentRequest : ReimbursementRequest;
  firstName : string = " ";
  lastName : string = " ";
  currentStatusName : string = " ";
  currentTypeName : string = " ";
  currentDescription : string = " ";

  index = 0;
  tableHeader = "Pending Requests";
  users : any[];
  reimbursementTypes : ReimbursementType[];
  reimbursementStatus : ReimbursementStatus[];
  pendingRequests : ReimbursementRequest[];
  modalActions = new EventEmitter<string|MaterializeAction>();

  p : number = 1;
  collection : any[] = this.pendingRequests;  
  tootltip : string = "This is a list of all of reimbursement requests that are awaiting approval";
  data = true;

  @Output() submittedDecision : EventEmitter<any> = new EventEmitter<any>();

  constructor(public ersApp : ERSController, public ngZone :  NgZone, public dialog: MatDialog){ }

  ngOnInit(){
    this.users = this.ersApp.users;
    this.pendingRequests = _.orderBy(
      _.filter(this.ersApp.reimbursementRequests, (r)=>{
        if(r.reimbursementProcessorId == null){
          return r;
        }
      }), 
      ['reimbursementSubmitted'], ['desc']);
    this.reimbursementStatus = this.ersApp.reimbursementStatus;
    this.reimbursementTypes = this.ersApp.reimbursementTypes;
  }

  ngAfterViewChecked(){ }

  public getStatusName(id : number) : string {
    let name;
     _.filter(this.reimbursementStatus, function(s){ if(s.reimbursementStatusId == id) name = s.reimbursementStatusName; });
    return name;
  }

  public getTypeName(id : number) : string {
    let name;
     _.filter(this.reimbursementTypes, function(t){ if(t.reimbursementTypeId == id) name = t.reimbursementTypeName; });
    return name;
  }

  public getUserFirstName(){
    return _.filter(this.users, (u) => { if(u.userId == this.currentRequest.reimbursementAuthorId) return u; })[0].firstName;
  }

  public getUserLastName(){
    return _.filter(this.users, (u) => { if(u.userId == this.currentRequest.reimbursementAuthorId) return u; })[0].lastName;
  }

  openDialog(action : any, p : any): void {
    if(action == 'deny'){
      this.ngZone.run(() => {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, { width: '250px', data: { title: "Confirm Denial", request: p, action: "denial", event: this.submittedDecision }});
        dialogRef.afterClosed().subscribe(result => { /* console.log('The dialog was closed'); */ });
      });
    }else if(action == 'approve'){
      this.ngZone.run(() => {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, { width: '250px', data: { title: "Confirm Approval", request: p, action: "approval", event: this.submittedDecision }});
        dialogRef.afterClosed().subscribe(result => { /* console.log('The dialog was closed'); */ });
      });
    }
  }

  openModal(p?:any) {
    this.currentRequest = p;
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
}) export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ngZone : NgZone,
    public ersApp : ERSController) { }

  cancel():void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

  onClick(): void {
    let $request : ReimbursementRequest = <ReimbursementRequest>{};
    $request = this.data.request;
    $request.reimbursementProcessorId = this.ersApp.currentUser.userId;
    $request.reimbursementSubmitted = moment($request.reimbursementSubmitted, "YYYY-MM-DD hh:mm:ss").format('DD-MMM-YYYY h:mm:ss');
    $request.reimbursementProcessed = moment().format('DD-MMM-YYYY h:mm:ss');

    if(this.data.action == "approval") $request.reimbursementStatusId = 1000000001;    
    else if(this.data.action == "denial") $request.reimbursementStatusId = 1000000002;

    this.ersApp
        .updateReimbursementRequest($request)
        .subscribe(
          (data: any) => {
            data.reimbursementSubmitted = moment(data.reimbursementSubmitted, "YYYY-MMM-DD hh:mm:ss").format('YYYY-MM-DD h:mm:ss');
            data.reimbursementProcessed = moment(data.reimbursementProcessed, "YYYY-MMM-DD hh:mm:ss").format('YYYY-MM-DD h:mm:ss');
            this.ersApp.submittedDecision = data;
            this.dialogRef.close();
            this.ngZone.run(() => { this.data.event.emit(data); });
          },
          (error) => { this.ngZone.run(() => { this.dialogRef.close(); }); }
        );
  }
}
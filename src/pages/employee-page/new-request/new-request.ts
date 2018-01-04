import { Component, EventEmitter, Output } from '@angular/core';
import { ERSController } from '../../../providers/ers-controller/ers-controller';
import { ReimbursementRequest, ReimbursementStatus, ReimbursementType, User } from '../../../interfaces/model/model.interfaces';
import * as moment from 'moment';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'page-new-request',
  templateUrl: 'new-request.html'
})

export class NewRequestPage {

  selected : any;  
  requestOptions : any[] = [];

  amount : any = 0.00;
  description : string;

  @Output() submittedRequest : EventEmitter<any> = new EventEmitter<any>();

  constructor(public ersApp : ERSController, public snackBar: MatSnackBar){
    _.map(this.ersApp.reimbursementTypes, (r:any)=>{
      this.requestOptions.push({id : r.reimbursementTypeId, value : r.reimbursementTypeName});
    });
    this.selected = this.requestOptions[0].value; 
  }

  openSnackBar(message:string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  updateAmount(a : any){
    this.amount = a;
  }

  updateDescription(d : any){
    this.description = d;
  }

  submitRequest(){
    let $request : ReimbursementRequest = <ReimbursementRequest>{};
    $request.reimbursementAuthorId = this.ersApp.currentUser.userId;
    $request.reimbursementRequestAmount = this.amount;
    $request.reimbursementDescription = this.description;
    $request.reimbursementSubmitted = moment().format('DD-MMM-YYYY h:mm:ss');
    $request.reimbursementTypeId = _.filter(this.requestOptions, (r:any)=>{ if(this.selected == r.value) return r; })[0].id;
    $request.reimbursementStatusId = _.filter(this.ersApp.reimbursementStatus, (r:any)=>{ if(r.reimbursementStatusName == "PENDING") return r; })[0].reimbursementStatusId;

    if(($request.reimbursementAuthorId != null && $request.reimbursementAuthorId != undefined) &&
      ($request.reimbursementRequestAmount != null &&  $request.reimbursementRequestAmount != undefined) &&
      ($request.reimbursementDescription != null && $request.reimbursementDescription != undefined 
        && $request.reimbursementDescription.trim().length > 0) &&
      ($request.reimbursementSubmitted != null && $request.reimbursementSubmitted != undefined) &&
      ($request.reimbursementTypeId != null && $request.reimbursementTypeId != undefined) &&
      ($request.reimbursementStatusId != null && $request.reimbursementStatusId != undefined)){
        (isNaN(parseFloat(this.amount))) ?
          this.openSnackBar("Please enter a valid amount") :
          this.ersApp.SubmitReimbursementRequest($request, this.submittedRequest);          
    }else{ this.openSnackBar("All fields are required!"); }
  }
}
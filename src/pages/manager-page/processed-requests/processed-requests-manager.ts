import { Component, EventEmitter, Input, AfterViewInit, NgZone, OnInit } from '@angular/core';
import * as Mock from '../../../mock/reimbursements.mock';
import { ReimbursementRequest, ReimbursementStatus, ReimbursementType } from '../../../interfaces/model/model.interfaces';
import { ReimbursementRequestBundle } from '../../../interfaces/app/app.interfaces';
import { MaterializeAction } from 'angular2-materialize';
import { materialize } from 'rxjs/operators/materialize';
import { ERSController } from '../../../providers/ers-controller/ers-controller';
import * as _ from 'lodash';

@Component({
  selector: 'page-processed-requests-manager',
  templateUrl: 'processed-requests-manager.html'
})

export class ProcessedRequestsManagerPage implements OnInit{

  // @Input()
  currentRequest : ReimbursementRequest;
  // currentRequest : ReimbursementRequest = <ReimbursementRequest>{};
  currentStatusName : string = " ";
  currentTypeName : string = " ";
  currentDescription : string = " ";

  index = 0;
  tableHeader = "Processed Requests";
  users : any[];
  reimbursementTypes : ReimbursementType[];
  reimbursementStatus : ReimbursementStatus[];
  pendingRequests : ReimbursementRequest[];
  modalActions = new EventEmitter<string|MaterializeAction>();

  p: number = 1;
  collection: any[] = this.pendingRequests;  

  data = true;

  constructor(public ersApp : ERSController, public ngZone : NgZone){ }

  ngOnInit(){
    this.ngZone.run(() => {
        this.ersApp.GetAllRequests().subscribe(
            (data: any) => {
                this.users = this.ersApp.users;
                this.ersApp.reimbursementRequests = data;
                this.pendingRequests = _.orderBy(
                    _.filter(this.ersApp.reimbursementRequests, (p:ReimbursementRequest) => {
                        if(p.reimbursementProcessorId == this.ersApp.currentUser.userId) return p;
                    }), ['reimbursementProcessed'], ['desc']);
                  this.reimbursementStatus = this.ersApp.reimbursementStatus;
                  this.reimbursementTypes = this.ersApp.reimbursementTypes;
                console.log(this.ersApp.submittedDecision)
                if(this.ersApp.submittedDecision != null && this.ersApp.submittedDecision != undefined){
                    this.openModal(this.ersApp.submittedDecision);
                }
            },
            (error) => {
                console.log(error);
        });
    });
  }

  public getUserFirstName(){
    return _.filter(this.users, (u) => { if(u.userId == this.currentRequest.reimbursementAuthorId) return u; })[0].firstName;
  }

  public getUserLastName(){
    return _.filter(this.users, (u) => { if(u.userId == this.currentRequest.reimbursementAuthorId) return u; })[0].lastName;
  }

  public setStatusName(p : any){
    _.map(this.reimbursementStatus, (s) => { if(s.reimbursementStatusId == p.reimbursementStatusId) this.currentStatusName = s.reimbursementStatusName; });
  }

  public setTypeName(p : any) {
    _.map(this.reimbursementTypes, (t) => { if(t.reimbursementTypeId == p.reimbursementTypeId) this.currentTypeName = t.reimbursementTypeName; });
  }

  public setDescription(p : any){
    this.currentDescription = p.reimbursementDescription;
  }

  public getTypeName(id : number) : string {
    let name;
     _.filter(this.reimbursementTypes, function(t) { if(t.reimbursementTypeId == id) name = t.reimbursementTypeName; });
    return name;
  }

  public getStatusName(id : number) : string {
    let name;
     _.filter(this.reimbursementStatus, function(s) { if(s.reimbursementStatusId == id) name = s.reimbursementStatusName; });
    return name;
  }

  openModal(p?:any) {
    this.ngZone.run(()=>{
      this.currentRequest = p;
      this.setStatusName(p);
      this.setTypeName(p);
      this.setDescription(p);
      this.modalActions.emit({action:"modal",params:['open']});
      this.modalActions.emit({action:"modal",params:['open']});
    });
    this.ersApp.submittedDecision = null;
  }

  closeModal() {
    this.currentRequest = null;
    this.ersApp.submittedDecision = null;
    this.modalActions.emit({action:"modal",params:['close']});
  }
}
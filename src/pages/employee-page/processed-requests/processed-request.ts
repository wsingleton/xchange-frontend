import { Component, EventEmitter, Input, AfterViewInit, NgZone, OnInit } from '@angular/core';
import * as Mock from '../../../mock/reimbursements.mock';
import { ReimbursementRequest, ReimbursementStatus, ReimbursementType } from '../../../interfaces/model/model.interfaces';
import { ReimbursementRequestBundle } from '../../../interfaces/app/app.interfaces';
import { MaterializeAction } from 'angular2-materialize';
import { materialize } from 'rxjs/operators/materialize';
import { ERSController } from '../../../providers/ers-controller/ers-controller';
import * as _ from 'lodash';


@Component({
  selector: 'page-processed-requests',
  templateUrl: 'processed-requests.html'
})

export class ProcessedRequestsPage implements OnInit{

  currentRequest : ReimbursementRequest = <ReimbursementRequest>{};
  currentStatusName : string = " ";
  currentTypeName : string = " ";
  currentDescription : string = " ";

  index = 0;
  tableHeader = "Processed Requests";
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
      this.pendingRequests = _.orderBy(
        _.filter(this.ersApp.reimbursementRequests, (p:ReimbursementRequest) => {
            if(p.reimbursementProcessorId != null) return p;
        }), ['reimbursementProcessed'], ['desc']);
      this.reimbursementStatus = this.ersApp.reimbursementStatus;
      this.reimbursementTypes = this.ersApp.reimbursementTypes;
    });
  }

  public setStatusName(p : any){
    _.map(this.reimbursementStatus, (s) => { 
      if(s.reimbursementStatusId == p.reimbursementStatusId) this.currentStatusName = s.reimbursementStatusName;
    });
  }

  public setTypeName(p : any) {
    _.map(this.reimbursementTypes, (t) => { 
      if(t.reimbursementTypeId == p.reimbursementTypeId) this.currentTypeName = t.reimbursementTypeName;
    });
  }

  public setDescription(p : any){
    this.currentDescription = p.reimbursementDescription;
  }

  public getTypeName(id : number) : string {
    let name;
     _.filter(this.reimbursementTypes, function(t) { 
      if(t.reimbursementTypeId == id){
        name = t.reimbursementTypeName;
      }
    });
    return name;
  }

  openModal(p?:any) {
    this.currentRequest = p;
    this.setStatusName(p);
    this.setTypeName(p);
    this.setDescription(p);
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.currentRequest = null;
    this.modalActions.emit({action:"modal",params:['close']});
  }
}
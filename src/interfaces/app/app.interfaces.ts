import {User, ReimbursementStatus, ReimbursementType} from '../model/model.interfaces';

export interface ReimbursementRequestBundle {
    requestId : number;
    amount : number;
    description : string;
    submitDate : string;
    processedDate : string;
    receipt : string | null;
    author : User;
    processor : User | null;
    status : ReimbursementStatus | number;
    type : ReimbursementType | number;
}


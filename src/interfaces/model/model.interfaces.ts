
export interface User{
    userId : number;
    roleId : number;
    username : string;
    password : string;
    firstname : string;
    lastname : string;
    email : string;
}

export interface UserRole{
    roleId : number;
    name : string;
}

export interface ReimbursementRequest{
    reimbursementAuthorId : number;
    reimbursementDescription : string;
    reimbursementProcessed : string | null;
    reimbursementProcessorId : number | null;
    reimbursementReceipt : string | null;
    reimbursementRequestAmount : number;
    reimbursementRequestId : number;
    reimbursementStatusId : number;
    reimbursementSubmitted : string;
    reimbursementTypeId : number;
}

export interface ReimbursementStatus{
    reimbursementStatusId : number;
    reimbursementStatusName : string;
}

export interface ReimbursementType{
    reimbursementTypeId : number;
    reimbursementTypeName : string;
}

import { Http, Headers, RequestOptions } from "@angular/http";

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';

import { Observable } from "rxjs/Observable";
import { endpoints } from '../../constants/endpoints';

const API_HOST  = "http://localhost:8081/ERS";

export class HttpService {

// headers: RequestOptions = new RequestOptions({ headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded"})});
headers: RequestOptions = new RequestOptions({ headers: new Headers({ "Content-Type": "text/plain"})});

constructor(protected http: Http) {
}

public AddNewUser($requestBody : {}) {
    return this.post(endpoints.AddNewUser, $requestBody);
}

public GetAllUsers() {
    return this.post(endpoints.GetAllUsers);
}

public GetAllUserRoles() {
    return this.post(endpoints.GetAllUserRoles);
}

public GetUserByID($requestBody : {}) {
    return this.post(endpoints.GetUserByID, $requestBody);
}

public GetUserRoleByID($requestBody : {}) {
    return this.post(endpoints.GetUserRoleByID, $requestBody);
}

public SubmitReimbursementRequest($requestBody : {}) {
    return this.post(endpoints.AddNewReimbursementRequest, $requestBody);
}

public UpdateReimbursementRequest($requestBody : {}) {
    return this.post(endpoints.UpdateReimbursementRequest, $requestBody);
}

public GetAllReimbursementRequests() {
    return this.post(endpoints.GetAllReimbursementRequests);
}

public GetAllReimbursementRequestsByAuthorID($requestBody : {}) {
    return this.post(endpoints.GetAllReimbursementRequestsByAuthorID, $requestBody);
}

public GetAllReimbursementStatus() {
    return this.post(endpoints.GetAllReimbursementStatus);
}

public GetAllReimbursementTypes() {
    return this.post(endpoints.GetAllReimbursementTypes);
}

public Login($requestBody : {}) {
    return this.post(endpoints.Login, $requestBody);
}

private post(where: string, what?: {}): Observable<any> {
    return this.http
               .post(API_HOST + where,
                     JSON.stringify(what),
                     this.headers)
               .timeout(3000)
               .map(res => {return res.json()});
}

}
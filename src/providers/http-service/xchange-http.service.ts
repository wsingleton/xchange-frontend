import { Http, Headers, RequestOptions } from "@angular/http";

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';

import { Observable } from "rxjs/Observable";
import { xchange_endpoints } from '../../constants/endpoints';
import * as _ from 'lodash';

const API_HOST  = " http://localhost:3000";
// const EB_API_HOST = "http://default-environment.wbpuprfx4t.us-east-2.elasticbeanstalk.com";
const EB_API_HOST = "http://xchange-backend.us-east-2.elasticbeanstalk.com/";

export class HttpService {

headers: RequestOptions = new RequestOptions({ headers: new Headers({ "Content-Type": "application/json"})});
// headers: RequestOptions = new RequestOptions({ headers: new Headers({ "Content-Type": "text/plain"})});

constructor(protected http: Http) {
}

public GetAllUsers() {
    return this.get("/users/GetAllUsers");
}

public GetAllUserSubscriptions($requestBody:{userId:number}) {
    return this.post("/users/GetAllUserSubscriptions", $requestBody);
}

public GetAllUserSubscribers($requestBody:{userId:number}) {
    return this.post("/users/GetUserSubscribers", $requestBody);
}

public AddUserFavorite($requestBody:{userId:number, companyId:number}) {
    return this.post("/users/AddUserFavorite", $requestBody);
}

public RemoveUserFavorite($requestBody:{userId:number, companyId: number}) {
    // return this.post("/users/RemoveUserFavorite", $requestBody);
    return this.http
            .post(EB_API_HOST + "/users/RemoveUserFavorite",
                JSON.stringify($requestBody),
                this.headers);
            // .timeout(3000);
}

public GetAllUserFavorites($requestBody:{userId:number}) {
    return this.post("/users/GetAllUserFavorites", $requestBody);
}

public GetAllCompanies() {
    return this.get("/companies/GetAllCompanies");
}

private get(where: string): Observable<any> {
    return this.http
               .get(EB_API_HOST + where,
                     this.headers)
            //    .timeout(3000)
               .map(res => {return res.json()});

}

private post(where: string, what?: {}): Observable<any> {

    console.log(what);

    return this.http
               .post(EB_API_HOST + where,
                    JSON.stringify(what),
                     this.headers)
            //    .timeout(3000)
               .map(res => {return res.json()});
            //    .catch();

}

}
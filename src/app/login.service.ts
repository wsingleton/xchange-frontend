import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'interfaces/xchange-interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


//const AWS_URL: string = "xchangedb.c2kh4xehvs7x.us-west-2.rds.amazonaws.com";
//const API_URL: string = "http://localhost:8091/";
const API_URL: string = "http://xchange-backend.us-east-2.elasticbeanstalk.com/";

@Injectable()
export class LoginService {

  subscribers: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  // if user exists, take the object from the local storage and put that
  // in the behaviorSubject object
  constructor(private http: HttpClient, private router: Router) {
    var u = localStorage.getItem("user");
    console.log(u);
    if(u) this.subscribers.next(JSON.parse(u));
  }

/**************** need login url mapping at backend here******************* */

  login(username: String, password: String){
    return this.http.post<User>(API_URL + "users/login", {
      username: username,
      password: password
    });
  }

  subscribeToLogin(f: (value: User)=>void){
    this.subscribers.subscribe(f);
  }

  updateInfo(user: User){
    return this.http.post<User>(API_URL + "users/UpdateUser", user);
  }

  register(user: User){
    return this.http.post<User>(API_URL + "users/AddNewUser", user);
  }

  validateUsername(username: String) {
    return this.http.post(API_URL + "users/GetUserByUsername", {
      username: username
    })
  }

  validateEmail(email: String) {
    return this.http.post(API_URL + "users/GetUserByEmail", {
      email: email
    })
  }

  logout() {
    localStorage.removeItem("user");
    this.subscribers.next(null);
    console.log("user logged out");
  }
}
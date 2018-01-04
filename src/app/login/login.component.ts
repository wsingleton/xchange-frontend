import { Component, Input, Output, EventEmitter, NgZone, OnInit } from '@angular/core';
import { ERSController } from '../../providers/ers-controller/ers-controller';
import { MaterializeDirective } from "angular2-materialize";
import { MatTabChangeEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { setTimeout } from 'timers';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'app/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isValid: boolean = true;
 
  username: string = "";
  password: string = "";

  ngOnInit() {
    this.loginService.subscribers.subscribe(u => {
      if(u != null) {
       this.router.navigate(["dashboard"]);
      }
    });
  }
  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    this.loginService.login(this.username, this.password)
    .subscribe(users => {
      if(users == null) {
        this.isValid = !this.isValid;
      }
      this.loginService.subscribers.next(users);
      localStorage.setItem("user", JSON.stringify(users));
    })
  }
}
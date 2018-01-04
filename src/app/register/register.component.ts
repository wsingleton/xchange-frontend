import { Component, OnInit } from '@angular/core';
import { ERSController } from '../../providers/ers-controller/ers-controller';
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { User } from 'interfaces/xchange-interfaces/interfaces';
import { LoginService } from 'app/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isValidUsername: boolean = true;
  isValidEmail: boolean = true;
  user: any = {};
  confirmPass: String;
  usernameFlag: boolean = false;
  emailFlag: boolean = false;
  passwordFlag: boolean = true;

  constructor(private loginService: LoginService, private router: Router){}

  ngOnInit(){}

  register() {
   this.loginService.register(this.user)
   .subscribe(data => {
    if(data.email == null) {
      //this.isValidEmail = !this.isValidEmail;
    } 
    else if(data.username == null) {
      //this.isValidUsername = !this.isValidUsername;
        } 
    else 
      this.router.navigate(["/login"])
    });
  }

  validateEmail(){
    this.loginService.validateEmail(this.user.email)
    .subscribe(data => {
      // return true when email is available
      if(data == null) {
        this.emailFlag = false;
      }
      // return false when email already exists in database
      else{
        this.emailFlag = true;
      }
      console.log(this.emailFlag);
    })
  }

  validateUsername(){
    this.loginService.validateUsername(this.user.username)
    .subscribe(data => {
      if(data == null) {
        this.usernameFlag = false;
        console.log("username is available");
      }
      else{
        this.usernameFlag = true;
        console.log("username is taken");
      }
      console.log(this.usernameFlag);
    })
  }


  validatePassword(){
    console.log("Passwords:\n" + this.confirmPass + "\n" + this.user.password);
    if(this.confirmPass == this.user.password){
      this.passwordFlag = true;
      console.log(this.passwordFlag);
    }
    else{
      this.passwordFlag = false;
    }
  }

  cancel(){
    this.router.navigate(["login"]);
  }
}

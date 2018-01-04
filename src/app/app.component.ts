import { Component, NgZone, AnimationTransitionEvent } from '@angular/core';
import { ERSController } from '../providers/ers-controller/ers-controller';
import { XChangeController } from '../providers/ers-controller/xchange-controller';
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private ersApp: ERSController, 
              private xchangeApp: XChangeController,
              public ngZone:NgZone, 
              public router: Router, 
              public snackBar: MatSnackBar){

      // this.xchangeApp.getAllUsers();
      // this.xchangeApp.getAllUserSubscriptions();
      // this.xchangeApp.getAllUserFavorites();
      // this.xchangeApp.getAllCompanies();
      
  }
}

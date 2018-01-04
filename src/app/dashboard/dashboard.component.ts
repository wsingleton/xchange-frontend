import { Component, AnimationTransitionEvent, ViewEncapsulation, Output, EventEmitter, NgZone, OnInit, ViewChild } from '@angular/core';
import { TransitionController, Transition, TransitionDirection } from "ng2-semantic-ui";
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { SidebarModule } from 'ng-sidebar';
import { MaterializeAction } from 'angular2-materialize';
import { ERSController } from '../../providers/ers-controller/ers-controller';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { LoginService } from 'app/login.service';
import { User } from 'interfaces/xchange-interfaces/interfaces';


export interface ModalContext {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<ModalContext, string, string>

  @Output() logoutEvent: EventEmitter<any> = new EventEmitter<any>();
  public transitionController = new TransitionController();

  amount: number = 0.00;
  description: string;
  currentUserRoleId: number;
  modalActions = new EventEmitter<string | MaterializeAction>();

  newsPage: any = true;
  listingsPage: any = false;
  watchlistPage: any = false;
  subscriptionsPage: any = false;
  searchPage: any = false;

  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";

  public logo = '../../assets/logos/ers-logo.svg';

  _opened: boolean = false;
  _modeNum: number = 2;
  _positionNum: number = 0;
  _dock: boolean = false;
  _closeOnClickOutside: boolean = true;
  _closeOnClickBackdrop: boolean = false;
  _showBackdrop: boolean = false;
  _animate: boolean = true;
  _trapFocus: boolean = true;
  _autoFocus: boolean = true;
  _keyClose: boolean = false;
  _autoCollapseHeight: number = null;
  _autoCollapseWidth: number = null;
  _MODES: Array<string> = ['over', 'push', 'slide'];
  _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];

  constructor(public ngZone: NgZone, private loginService: LoginService,
    private router: Router, public modalService: SuiModalService) { }

  // Get User Information from local storage
  oldEmail: string;
  oldUsername: string;
  oldFirstName: string;
  oldLastName: string;
  oldPassword: string;

  // Blur Validations
  usernameFlag: boolean = false;
  emailFlag: boolean = false;

  // Trigger for changing button values
  on: boolean = true;

  // Email and Username validation messages
  isValidUsername: boolean = true;
  isValidEmail: boolean = true;


  user: User = this.loginService.subscribers.getValue();

  ngOnInit() {
    this.user = this.loginService.subscribers.getValue();
    this.oldEmail = this.user.email;
    this.oldUsername = this.user.username;
    this.oldFirstName = this.user.firstName;
    this.oldLastName = this.user.lastName;
    this.oldEmail = this.user.email;
    this.oldPassword = this.user.password;
  }

  validateEmail() {
    this.loginService.validateEmail(this.user.email)
      .subscribe(data => {
        if (data == null) {
          this.emailFlag = false;
        }
        else {
          this.emailFlag = true;
        }
      })
  }

  validateUsername() {
    this.loginService.validateUsername(this.user.username)
      .subscribe(data => {
        if (data == null) {
          this.usernameFlag = false;
        }
        else {
          this.usernameFlag = true;
        }
      })
  }

  // Toggle views between editing and displaying user information
  isValid: boolean = false;
  changeView() {
    // Toggling between button values "Back" and "Edit"
    if(this.on) {
      document.getElementById("toggle").innerText = 'Back';
      this.on = !this.on;
      console.log("Off");
    }
    else {
      document.getElementById("toggle").innerText = 'Edit';
      this.on = !this.on;
      console.log("On");
    }
    // Triggers
    this.usernameFlag = false;
    this.emailFlag = false;
    this.isValidUsername = true;
    this.isValidEmail = true;
    this.isValid = !this.isValid;
    // Assinging old user info user object
    this.user.username = this.oldUsername;
    this.user.firstName = this.oldFirstName;
    this.user.lastName = this.oldLastName;
    this.user.email = this.oldEmail;
    this.user.password = this.oldPassword;
  }

  // User Profile Modal
  public openProfileModal() {
    const config = new TemplateModalConfig<ModalContext, string, string>(this.modalTemplate);
    config.closeResult = "closed!";
    config.mustScroll = true;
    config.context = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      userName: this.user.username,
      email: this.user.email
    };
    this.modalService
      .open(config)
      .onApprove(result => { })
      .onDeny(result => {
        this.user.username = this.oldUsername;
        this.user.firstName = this.oldFirstName;
        this.user.lastName = this.oldLastName;
        this.user.email = this.oldEmail;
        this.user.password = this.oldPassword;
        this.isValid = false;
        this.on = true;
      });
  }

  // Update user profile information
  update() {
    this.isValidUsername = true;
    this.isValidEmail = true;
    this.loginService.updateInfo(this.user)
      .subscribe(data => {
        // Assigning updated data to the user
        this.user.username = data.username;
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
        this.user.email = data.email;
        this.user.password = data.password;

        // Updating the old user info
        this.oldUsername = this.user.username;
        this.oldFirstName = this.user.firstName;
        this.oldLastName = this.user.lastName;
        this.oldEmail = this.user.email;
        this.oldPassword = this.user.password;
        
        // Trigger for toggling button
        this.on = false;
        
        // Store new user session
        this.loginService.subscribers.next(data);
        localStorage.setItem("user", JSON.stringify(data));
        this.changeView();
      });
  }

  public switchPage(e: any) {
    let target = e.target || e.srcElement || e.currentTarget;
    let id = target.attributes.id.nodeValue;
    this.ngZone.run(() => {
      if (id == "news") {
        this.newsPage = true;
        this.listingsPage = false;
        this.watchlistPage = false;
        this.subscriptionsPage = false;
        this.searchPage = false;

        // this.animate("shake");

      } else if (id == "listings") {
        this.newsPage = false;
        this.listingsPage = true;
        this.watchlistPage = false;
        this.subscriptionsPage = false;
        this.searchPage = false;

        // this.animate("shake");

      } else if (id == "watchlist") {
        this.newsPage = false;
        this.listingsPage = false;
        this.watchlistPage = true;
        this.subscriptionsPage = false;
        this.searchPage = false;
      } else if (id == "subscriptions") {
        this.newsPage = false;
        this.listingsPage = false;
        this.watchlistPage = false;
        this.subscriptionsPage = true;
        this.searchPage = false;
      } else if (id == "search") {
        this.newsPage = false;
        this.listingsPage = false;
        this.watchlistPage = false;
        this.subscriptionsPage = false;
        this.searchPage = true;
      }
    });
  }

  public animate(transitionName: string) {
    this.transitionController.animate(
      new Transition(transitionName, 500, TransitionDirection.In, () => console.log("Completed transition.")));
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }

  updateAmount(a: any) {
    this.amount = a;
  }

  updateDescription(d: any) {
    this.description = d;
  }

  openModal(p?: any) {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  _toggleOpened(): void {
    this._opened = !this._opened;
  }

  _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

  _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  _toggleDock(): void {
    this._dock = !this._dock;
  }

  _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  _onOpened(): void {
    console.info('Sidebar opened');
  }

  _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  _onClosed(): void {
    console.info('Sidebar closed');
  }


  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.city.length;
  }
}

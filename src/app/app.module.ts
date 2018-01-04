/*
This is the ROOT Module for ERS
Author: Nahom Tsadu
*/

//Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//App Routes
import { appRoutes } from './app.routes';

//App Services.. 
import { ERSController } from '../providers/ers-controller/ers-controller';
import { XChangeController } from '../providers/ers-controller/xchange-controller';

import { AlphaVantageService } from '../providers/alpha-vantage-service.service';
import { FetchingService } from '../providers/fetching.service';
import { ParsingService } from '../providers/parsing.service';

import { LoginService } from '../app/login.service';
import { NewsService } from './news.service';

import { WatchListSorter } from './watchlist/watchlist-sorter.service';

//Root Component
import { AppComponent } from './app.component';

//Supplement View Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NewRequestPage } from '../pages/employee-page/new-request/new-request';
import { PendingRequestsPage } from '../pages/employee-page/pending-requests/pending-requests';
import { PendingRequestsManagerPage } from '../pages/manager-page/pending-requests/pending-requests-manager';
import { ProcessedRequestsPage } from '../pages/employee-page/processed-requests/processed-request';
import { ProcessedRequestsManagerPage } from '../pages/manager-page/processed-requests/processed-requests-manager';

import { NewsComponent } from './news/news.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SearchComponent } from './search/search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ListingsComponent } from './listings/listings.component';


//Third Party Modules To Enhance UI/UX
import { SidebarModule } from 'ng-sidebar';
import { DataTableModule } from "angular2-datatable";
import { NgxPaginationModule } from 'ngx-pagination';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';
import { MomentModule } from 'angular2-moment';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../pages/manager-page/pending-requests/pending-requests-manager';
import { SuiModule } from 'ng2-semantic-ui';
import { MatCardModule } from '@angular/material/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "dashboard", component: DashboardComponent},
  { path: "news", component: NewsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NewRequestPage,
    PendingRequestsPage,
    PendingRequestsManagerPage,
    DialogOverviewExampleDialog,
    ProcessedRequestsPage,
    ProcessedRequestsManagerPage,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NewsComponent,
    SubscriptionsComponent,
    SearchComponent,
    WatchlistComponent,
    ListingsComponent,
    ProfileComponent
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    DataTableModule,
    NgxPaginationModule,
    MaterializeModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    SuiModule,
    InfiniteScrollModule,
    ChartsModule,
    SidebarModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    ERSController, 
    XChangeController,
    AlphaVantageService,
    FetchingService,
    ParsingService,
    NewsService,
    LoginService,
    WatchListSorter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

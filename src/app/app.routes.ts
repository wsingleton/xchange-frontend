import { NewRequestPage } from '../pages/employee-page/new-request/new-request';
import { PendingRequestsPage } from '../pages/employee-page/pending-requests/pending-requests';
import { ProcessedRequestsPage } from '../pages/employee-page/processed-requests/processed-request';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component' 
import { Routes } from '@angular/router';
import { NewsComponent } from 'app/news/news.component';

export const appRoutes : Routes = [
    {   path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
    // },
    // {
    //     path: 'news',
    //     component: NewsComponent
    // }
];
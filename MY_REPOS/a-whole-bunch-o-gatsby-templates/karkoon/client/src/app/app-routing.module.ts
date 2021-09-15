import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { IssueComponent } from './issue/issue.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [

  //Site routes goes here
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      // { path: 'about', component: AboutComponent },
      { path: 'issue/:id', component: IssueComponent }
    ]
  },

  // App routes goes here here
  // {
  //   path: '',
  //   component: AppLayoutComponent,
  //   children: [
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: 'profile', component: ProfileComponent }
  //   ]
  // },

  //no layout routes
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

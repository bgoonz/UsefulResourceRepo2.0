import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoComponent } from './demo.component';
import { ButtonDemoComponent } from './button-demo/button-demo.component';
import { InputDemoComponent } from './input-demo/input-demo.component';
import { SnackbarDemoComponent } from './snackbar-demo/snackbar-demo.component';

const DEMO_ROUTES: Routes = [
  {
    path: 'demo',
    component: DemoComponent,
    children: [
      {
        path: 'button-demo',
        component: ButtonDemoComponent
      },
      {
        path: 'input-demo',
        component: InputDemoComponent
      },
      {
        path: 'snackbar-demo',
        component: SnackbarDemoComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'button-demo'
      }]
  }]
@NgModule({
  imports: [RouterModule.forChild(DEMO_ROUTES)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
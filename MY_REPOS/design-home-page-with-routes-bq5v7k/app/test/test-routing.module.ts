import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { ButtonTestComponent } from './button-test/button-test.component';
import { InputTestComponent } from './input-test/input-test.component';
import { SnackbarTestComponent } from './snackbar-test/snackbar-test.component';

const TEST_ROUTES: Routes = [
  {
    path: 'test',
    component: TestComponent,
    children: [
      {
        path: 'button-test',
        component: ButtonTestComponent
      },
      {
        path: 'input-test',
        component: InputTestComponent
      },
      {
        path: 'snackbar-test',
        component: SnackbarTestComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'button-test'
      }]
  }]

@NgModule({
  imports: [RouterModule.forChild(TEST_ROUTES)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
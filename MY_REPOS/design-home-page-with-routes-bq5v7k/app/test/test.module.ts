import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonTestComponent } from './button-test/button-test.component';
import { InputTestComponent } from './input-test/input-test.component';
import { SnackbarTestComponent } from './snackbar-test/snackbar-test.component';


@NgModule({
  declarations: [
    ButtonTestComponent,
    InputTestComponent,
    SnackbarTestComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: []
})
export class TestModule { }

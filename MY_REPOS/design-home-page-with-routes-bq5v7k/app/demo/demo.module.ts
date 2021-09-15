import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDemoComponent } from './button-demo/button-demo.component';
import { InputDemoComponent } from './input-demo/input-demo.component';
import { SnackbarDemoComponent } from './snackbar-demo/snackbar-demo.component';


@NgModule({
  declarations: [
    ButtonDemoComponent,
    InputDemoComponent,
    SnackbarDemoComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: []
})
export class DemoModule { }

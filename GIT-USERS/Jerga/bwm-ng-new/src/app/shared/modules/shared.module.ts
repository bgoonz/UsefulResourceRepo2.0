import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UppercasePipe } from "../pipes/uppercase.pipe";
import { TimeFormatPipe } from "../pipes/time-format.pipe";

@NgModule({
  declarations: [UppercasePipe, TimeFormatPipe],
  exports: [UppercasePipe, TimeFormatPipe],
  imports: [CommonModule],
})
export class SharedModule {}

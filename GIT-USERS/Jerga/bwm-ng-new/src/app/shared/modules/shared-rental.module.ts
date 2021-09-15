import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RentalCardComponent } from "../rental-card/rental-card.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [RentalCardComponent],
  exports: [RentalCardComponent],
  imports: [RouterModule, CommonModule],
})
export class SharedRentalModule {}

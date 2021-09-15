import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentComponent } from "./payment.component";
import { PaymentService } from "src/app/services/payment.service";

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule],
  providers: [PaymentService],
  exports: [PaymentComponent],
})
export class PaymentModule {}

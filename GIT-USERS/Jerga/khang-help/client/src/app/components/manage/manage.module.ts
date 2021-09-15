import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { ManageBookingComponent } from "./manage-booking/manage-booking.component";
import { ManageRentalComponent } from "./manage-rental/manage-rental.component";
import { ManageComponent } from "./manage.component";
import { RentalService } from "src/app/services/rental.service";
import { BookingService } from "src/app/services/booking.service";
import { ManageRentalBookingComponent } from "./manage-rental/manage-rental-booking/manage-rental-booking.component";
import { NgPipesModule } from "ngx-pipes";
import { ReviewModule } from "src/app/components/review/review.module";

const routes: Routes = [
  {
    path: "manage",
    component: ManageComponent,
    children: [
      {
        path: "rentals",
        component: ManageRentalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "bookings",
        component: ManageBookingComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ManageBookingComponent,
    ManageRentalComponent,
    ManageComponent,
    ManageRentalBookingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgPipesModule,
    ReviewModule,
  ],
  providers: [AuthGuard, RentalService, BookingService],
})
export class ManageModule {}

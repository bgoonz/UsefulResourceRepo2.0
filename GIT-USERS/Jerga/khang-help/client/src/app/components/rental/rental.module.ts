import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalComponent } from "./rental.component";
import { RentalService } from "src/app/services/rental.service";

import { Routes, RouterModule } from "@angular/router";
import { RentalDetailComponent } from "../rental/rental-detail/rental-detail.component";
import {
  HttpClient,
  HttpHandler,
  HttpClientModule,
} from "@angular/common/http";

import { NgPipesModule, UcWordsPipe } from "ngx-pipes";
import { MapModule } from "../map/map.module";
import { AuthGuard } from "../auth/auth.guard";

import { Daterangepicker } from "ng2-daterangepicker";
import { RentalDetailBookingComponent } from "./rental-detail/rental-detail-booking/rental-detail-booking.component";
import { HelperService } from "../../services/helper.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookingService } from "src/app/services/booking.service";
import { RentalSearchComponent } from "./rental-search/rental-search.component";
import { RentalCreateComponent } from "./rental-create/rental-create.component";
import { RentalUpdateComponent } from "./rental-update/rental-update.component";
import { EditableModule } from "../editable/editable.module";
import { RentalGuard } from "./rental.guard";
import { ImageUploadModule } from "../image-upload/image-upload.module";
import { PaymentModule } from "../payment/payment.module";
import { StarRatingModule } from "angular-star-rating";
const routes: Routes = [
  // we still have route on app-routing-module
  // we do redirecto , pathmatch on the approuting
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      {
        path: "new",
        component: RentalCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ":rentalId/edit",
        component: RentalUpdateComponent,
        canActivate: [AuthGuard, RentalGuard],
      },
      {
        path: ":rentalId",
        component: RentalDetailComponent,
      },
      { path: ":city/homes", component: RentalSearchComponent },
    ],
  },
];

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    RentalDetailBookingComponent,
    RentalSearchComponent,
    RentalCreateComponent,
    RentalUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule,
    ReactiveFormsModule,
    EditableModule,
    ImageUploadModule,
    PaymentModule,
    StarRatingModule,
  ],

  // service inside the providers:
  providers: [
    RentalService,
    HttpClient,
    HelperService,
    BookingService,
    UcWordsPipe,
    RentalGuard,
  ],
})
export class RentalModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MapModule } from "../shared/modules/map/map.module";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { NgxSmartModalModule } from "ngx-smart-modal";

import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { RentalListingComponent } from "./rental-listing/rental-listing.component";
import { RentalComponent } from "./rental.component";
import { RentalSecretComponent } from "./rental-secret/rental-secret.component";

import { FirstUpperLetterPipe } from "../shared/pipes/uppercase.pipe";
import {
  HighlightDirective,
  BwmNgIfDirective,
  BwmNgForDirective,
} from "../shared/directives/custom.directive";
import { AuthGuard } from "../auth/shared/auth.guard";
import { RentalNewComponent } from "./rental-new/rental-new.component";
import { FormsModule } from "@angular/forms";
import { RentalBookingComponent } from "./components/rental-booking/rental-booking.component";
import { RentalHomesComponent } from "./rental-homes/rental-homes.component";
import { SharedRentalModule } from "../shared/modules/shared-rental.module";
import { SharedModule } from "../shared/modules/shared.module";
import { RentalEditComponent } from "./rental-edit/rental-edit.component";
import { RentalGuard } from "../auth/shared/rental.guard";
import { EditableModule } from "../shared/modules/editable/editable.module";
import { ImageUploadModule } from "../shared/modules/image-upload/image-upload.module";

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListingComponent },
      { path: "new", component: RentalNewComponent, canActivate: [AuthGuard] },
      {
        path: "secret",
        component: RentalSecretComponent,
        canActivate: [AuthGuard],
      },
      { path: ":city/homes", component: RentalHomesComponent },
      { path: ":rentalId", component: RentalDetailComponent },
      {
        path: ":rentalId/edit",
        component: RentalEditComponent,
        canActivate: [AuthGuard, RentalGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    RentalDetailComponent,
    RentalListingComponent,
    RentalComponent,
    FirstUpperLetterPipe,
    HighlightDirective,
    BwmNgIfDirective,
    BwmNgForDirective,
    RentalSecretComponent,
    RentalNewComponent,
    RentalBookingComponent,
    RentalHomesComponent,
    RentalEditComponent,
  ],
  imports: [
    SharedModule,
    ImageUploadModule,
    RouterModule.forChild(routes),
    CommonModule,
    MapModule,
    FormsModule,
    SharedRentalModule,
    EditableModule,
    NgxDaterangepickerMd.forRoot(),
    NgxSmartModalModule.forChild(),
  ],
})
export class RentalModule {}

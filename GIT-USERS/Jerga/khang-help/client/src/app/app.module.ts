import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { RentalModule } from "./components/rental/rental.module";
import { HttpClient } from "@angular/common/http";
import { MapModule } from "./components/map/map.module";
import { AuthModule } from "./components/auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { ManageModule } from "./components/manage/manage.module";
import { UserModule } from "./components/user/user.module";
import { StarRatingModule } from "angular-star-rating";
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RentalModule,
    MapModule,
    AuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ManageModule,
    UserModule,
    StarRatingModule.forRoot(),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}

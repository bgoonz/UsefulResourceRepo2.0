import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/header/header.component";

import { RentalModule } from "./rental/rental.module";
import { AuthModule } from "./auth/auth.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { TokenInterceptor } from "./auth/shared/token.interceptor";
import { ManageModule } from "./manage/manage.module";

// root module
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RentalModule,
    AuthModule,
    ManageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MdMenuModule,
  MaterialModule,
  MdButtonModule,
  MdToolbar,
  MdToolbarModule,
  MdTabsModule,
  MdCard,
  MdCardModule,
  MdGridListModule,
  MdListModule,
} from "@angular/material";
import "hammerjs";
import { CvComponent } from "./cv/cv.componen";
import { InfoComponent } from "./info/info.component";
import { AppRoutingModule } from "./app-routing.module";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioService } from "./portfolio/service/portfolio.service";
import { ProjectComponent } from "./projects/projects.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CvComponent,
    InfoComponent,
    PortfolioComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdMenuModule,
    MdButtonModule,
    MdToolbarModule,
    MdTabsModule,
    AppRoutingModule,
    MdCardModule,
    MdGridListModule,
    MdListModule,
  ],
  providers: [PortfolioService],
  bootstrap: [AppComponent],
})
export class AppModule {}

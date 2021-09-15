import { NgModule } from "@angular/core";
import { MapService } from "../../services/map.service";
import { CommonModule } from "@angular/common";
import { UserService } from "../../services/user.service";

import { UserComponent } from "./user.component";
import { UserDetailComponent } from "../user/user-detail/user-detail.component";

import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  // we still have route on app-routing-module
  // we do redirecto , pathmatch on the approuting
  {
    path: "users",
    component: UserComponent,
    children: [
      {
        path: "profile",
        canActivate: [AuthGuard],
        component: UserDetailComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [UserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [MapService, UserService, AuthService],
  exports: [UserComponent, UserDetailComponent],
})
export class UserModule {}

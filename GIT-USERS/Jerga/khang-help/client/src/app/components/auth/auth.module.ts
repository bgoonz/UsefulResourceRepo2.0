import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { MatButtonModule } from "@angular/material/button";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { AuthGuard } from "./auth.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";
const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}

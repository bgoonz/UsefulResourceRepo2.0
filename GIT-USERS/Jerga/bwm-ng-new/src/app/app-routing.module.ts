import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { GuestGuard } from "./auth/shared/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/rentals", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [GuestGuard] },
  { path: "register", component: RegisterComponent, canActivate: [GuestGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

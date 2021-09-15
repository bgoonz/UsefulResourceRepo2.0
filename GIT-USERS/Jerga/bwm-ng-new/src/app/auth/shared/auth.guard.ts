import { Injectable } from "@angular/core";
import { CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(_: any, state: RouterStateSnapshot) {
    return this.checkIfCanNavigate(state.url);
  }

  private checkIfCanNavigate(url: string): boolean {
    if (this.auth.isAuthenticated) {
      return true;
    }

    this.auth.redirectUrl = url;
    this.router.navigate(["/login"]);
    return false;
  }
}

@Injectable({
  providedIn: "root",
})
export class GuestGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(_: any, state: RouterStateSnapshot) {
    return this.checkIfCanNavigate(state.url);
  }

  private checkIfCanNavigate(url: string): boolean {
    if (this.auth.isAuthenticated) {
      this.router.navigate(["/rentals"]);
      return false;
    }

    return true;
  }
}

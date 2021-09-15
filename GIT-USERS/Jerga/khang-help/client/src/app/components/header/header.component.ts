import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return false;
  }

  logOut() {
    this.authService.logOut();

    this.router.navigate(["login"]);
  }

  getUserName() {
    return this.authService.getUserName();
  }

  search(city: string) {
    this.router.navigate([`/rentals/${city}/homes`]);
  }
}

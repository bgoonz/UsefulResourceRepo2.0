import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/shared/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "bwm-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {
    // this.logout = this.logout.bind(this);
  }

  ngOnInit() {
    this.auth.checkAuthentication();
  }

  logout = () => {
    this.auth.logout();
    this.router.navigate(["/rentals"]);
  };
}

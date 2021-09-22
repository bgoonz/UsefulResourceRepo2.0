import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "bwm-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Input("isAuthenticated") isAuthenticated = false;
  @Input("username") username = "";
  @Input("logout") logout = () => {};

  constructor(private router: Router) {}

  search(city: string) {
    city
      ? this.router.navigate([`/rentals/${city}/homes`])
      : this.router.navigate(["/rentals"]);
  }
}

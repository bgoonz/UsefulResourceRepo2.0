import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "src/app/rental/cart/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  numberOfItems: number;

  @Input("isAuthenticated") isAuthenticated = false;
  @Input("username") username = "";
  @Input("logout") logout = () => {};

  constructor(private router: Router, private cartService: CartService) {
    this.numberOfItems = Object.keys(this.cartService.getWishList()).length;
  }

  ngOnInit(): void {
    this.cartService.wishObs.subscribe((wishList) => {
      this.numberOfItems = Object.keys(wishList).length;
    });
  }

  search(city: string) {
    city
      ? this.router.navigate([`/rentals/${city}/homes`])
      : this.router.navigate(["/rentals"]);
  }
}

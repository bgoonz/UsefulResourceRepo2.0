import { Component, OnInit } from "@angular/core";
import { WishService } from "./wish.service";
import { RentalService } from "../shared/rental.service";
import { Rental } from "../shared/rental.model";
import { map } from "rxjs/operators";
import { forkJoin } from "rxjs";

interface CartItems {
  rental: Rental;
}

@Component({
  selector: "app-wish",
  templateUrl: "./wish.component.html",
  styleUrls: ["./wish.component.scss"],
})
export class WishComponent implements OnInit {
  cart;
  _wishList = {};

  constructor(private wishService: WishService) {}

  get wishList() {
    return Object.keys(this._wishList).map((wk) => this._wishList[wk]);
  }

  ngOnInit(): void {
    this._wishList = this.wishService.getWishList();
    this.subscribeCart();
  }

  subscribeCart() {
    this.wishService.wishObs.subscribe((wishList) => {
      this._wishList = { ...wishList };
    });
  }
}

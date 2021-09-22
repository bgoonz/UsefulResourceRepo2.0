import { Injectable } from "@angular/core";
import { Rental } from "../shared/rental.model";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  wishList = {};
  // tslint:disable: variable-name
  // tslint:disable: ban-types
  //  _cartObservable: BehaviorSubject<Object> ;
  _wishObservable: Subject<Object> = new Subject();

  constructor() {
    this.wishList = this.getWishList();
    this._wishObservable.next(this.wishList);
  }

  get wishObs() {
    return this._wishObservable;
  }

  getWishList() {
    return JSON.parse(localStorage.getItem("wishList")) || {};
  }

  addToWishList(rental: Rental) {
    debugger;
    this.wishList[rental._id] = rental;

    this._wishObservable.next(this.wishList);
    localStorage.setItem("wishList", JSON.stringify(this.wishList));
  }

  clearWishList() {
    localStorage.removeItem("wishList");
  }
}

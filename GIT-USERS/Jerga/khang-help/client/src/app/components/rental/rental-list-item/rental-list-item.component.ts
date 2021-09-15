import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-rental-list-item",
  templateUrl: "./rental-list-item.component.html",
  styleUrls: ["./rental-list-item.component.scss"],
})
export class RentalListItemComponent implements OnInit {
  // from the children component we decorate Input
  // then we put into the rental-list component
  // which is the father
  @Input() childRental: any;

  constructor() {}

  ngOnInit() {}
}

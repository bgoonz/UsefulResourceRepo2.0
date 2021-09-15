import { Component } from "@angular/core";

@Component({
  selector: "port-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.scss"],
})
export class HeaderComponent {
  redirect(url: string) {
    window.open(url, "_blank");
  }
}

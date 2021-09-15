import { Component } from "@angular/core";

@Component({
  selector: "port-project",
  templateUrl: "projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectComponent {
  public navigateTo(url: string): void {
    window.open(url, "_blank");
  }
}

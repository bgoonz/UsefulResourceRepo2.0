import { Component, OnInit } from "@angular/core";
import { Repo } from "./service/repo.model";
import { PortfolioService } from "./service/portfolio.service";

@Component({
  selector: "portfolio-cv",
  templateUrl: "portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent implements OnInit {
  public repos: Repo[] = [];

  constructor(private service: PortfolioService) {}

  public ngOnInit(): void {
    this.service.getRepos().subscribe(
      (repos: Repo[]) => {
        this.repos = repos;
      },
      (errors: string) => console.log(errors)
    );
  }

  public navigateTo(url: string): void {
    window.open(url, "_blank");
  }
}

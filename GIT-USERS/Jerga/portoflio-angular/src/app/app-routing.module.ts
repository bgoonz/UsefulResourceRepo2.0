import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CvComponent } from "./cv/cv.componen";
import { InfoComponent } from "./info/info.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { ProjectComponent } from "./projects/projects.component";

const appRoutes: Routes = [
  { path: "cv", component: CvComponent },
  { path: "projects", component: ProjectComponent },
  { path: "portfolio", component: PortfolioComponent },
  { path: "info", component: InfoComponent },
  { path: "", redirectTo: "/info", pathMatch: "full" },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "card",
        children: [
          {
            path: "",
            loadChildren: "../card/card.module#CardPageModule",
          },
        ],
      },
      {
        path: "tab2",
        children: [
          {
            path: "",
            loadChildren: "../tab2/tab2.module#Tab2PageModule",
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: "../tab3/tab3.module#Tab3PageModule",
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/card",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/card",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

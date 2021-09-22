// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { TabsPage } from './tabs.page';
import { CardDeckPage } from "../card/card-deck/card-deck.page";
import { CardListingPage } from "../card/card-listing/card-listing.page";
import { CardDetailPage } from "../card/card-detail/card-detail.page";
import { CardFavoritePage } from "../card/card-favorite/card-favorite.page";
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
          // { path: ':cardDeckGroup/:cardDeck', component: CardListingPage },
          // { path: ':cardId', component: CardDetailPage },
          // { path: '', component: CardDeckPage }
        ],
      },

      {
        path: "favorite",
        children: [
          {
            path: "",
            loadChildren: "../favorite/favorite.module#FavoritePageModule",
          },
        ],
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

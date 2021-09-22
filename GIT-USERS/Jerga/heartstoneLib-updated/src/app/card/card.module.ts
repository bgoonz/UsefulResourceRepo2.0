import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { CardDeckPage } from "./card-deck/card-deck.page";
import { CardListingPage } from "./card-listing/card-listing.page";
import { CardDetailPage } from "./card-detail/card-detail.page";
import { CardFavoritePage } from "./card-favorite/card-favorite.page";

import { CardService } from "./shared/card.service";
import { LoaderService } from "../shared/service/loader.service";
import { ToastService } from "../shared/service/toast.service";
import { AlertService } from "../shared/service/alert.service";

import { CardListComponent } from "./components/card-list.component";
import { SearchComponent } from "../shared/component/search/search.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: ":cardDeckGroup/:cardDeck", component: CardListingPage },
      { path: ":cardId", component: CardDetailPage },
      { path: "", component: CardDeckPage },
    ]),
  ],
  providers: [CardService, LoaderService, ToastService, AlertService],
  declarations: [
    CardDeckPage,
    CardListingPage,
    CardListComponent,
    CardDetailPage,
    SearchComponent,
    CardFavoritePage,
  ],
})
export class CardPageModule {}

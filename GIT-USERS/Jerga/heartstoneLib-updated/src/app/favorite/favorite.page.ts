import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { FavoriteCardStore } from "../card/shared/card-favorite.store";
import { Card } from "../card/shared/card.model";

@Component({
  selector: "app-card-favorite",
  templateUrl: "./favorite.page.html",
})
export class CardFavoritePage {
  favoriteCardList: Card[] = [];

  favoriteCardSub: Subscription;

  constructor(private favoriteCardStore: FavoriteCardStore) {}

  ionViewWillEnter() {
    this.favoriteCardSub = this.favoriteCardStore.favoriteCards.subscribe(
      (favoriteCards: any) => {
        this.favoriteCardList = this.getFavoriteCardList(favoriteCards);
        console.log(this.favoriteCardList);
      }
    );
  }

  ionViewDidLeave() {
    if (this.favoriteCardSub && !this.favoriteCardSub.closed) {
      this.favoriteCardSub.unsubscribe();
    }
  }

  private getFavoriteCardList(favoriteCards: any): Card[] {
    if (favoriteCards) {
      return Object.keys(favoriteCards)
        .filter((key) => favoriteCards[key])
        .map((key) => favoriteCards[key]);
    }

    return [];
  }
}

import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CardFavoritePage } from "./favorite.page";
import { FavoriteCardStore } from "../card/shared/card-favorite.store";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: CardFavoritePage }]),
  ],
  declarations: [CardFavoritePage],
})
export class FavoritePageModule {}

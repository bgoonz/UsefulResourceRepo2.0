import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CardPage } from "./card.page";
import { CardDetailPage } from "./card-detail/card-detail.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: "", component: CardPage },
      { path: "cardDetail", component: CardDetailPage },
    ]),
  ],
  declarations: [CardPage, CardDetailPage],
})
export class CardPageModule {}

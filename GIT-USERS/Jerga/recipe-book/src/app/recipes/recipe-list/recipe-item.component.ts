import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe";

@Component({
  selector: "rb-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styles: [
    `
      img {
        width: 100px;
      }
    `,
  ],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() recipeId: number;
}

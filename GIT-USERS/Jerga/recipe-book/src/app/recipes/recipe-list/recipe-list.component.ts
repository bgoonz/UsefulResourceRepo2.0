import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "rb-recipe-list",
  templateUrl: "./recipe-list.component.html",
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanges.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
    );
  }
}

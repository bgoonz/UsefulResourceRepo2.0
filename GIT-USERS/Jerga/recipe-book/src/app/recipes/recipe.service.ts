import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./recipe";
import { Ingredient } from "../shared/ingredient";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class RecipeService {
  recipesChanges = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Chicken",
      "Yummy",
      "http://images.media-allrecipes.com/userphotos/250x250/2280937.jpg",
      [new Ingredient("Chicken breast", 4), new Ingredient("Potatos", 6)]
    ),
    new Recipe(
      "Beef",
      "Spicy",
      "http://images.media-allrecipes.com/userphotos/250x250/3298188.jpg",
      []
    ),
  ];

  constructor(private http: Http) {}

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    return this.http.put(
      "https://recipebook-8a08d.firebaseio.com/recipes.json",
      body,
      {
        headers: headers,
      }
    );
  }

  fetchData() {
    return this.http
      .get("https://recipebook-8a08d.firebaseio.com/recipes.json")
      .map((response: Response) => response.json())
      .subscribe((data: Recipe[]) => {
        this.recipes = data;
        this.recipesChanges.emit(this.recipes);
      });
  }
}

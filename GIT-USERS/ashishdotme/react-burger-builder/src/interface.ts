export enum Ingredient {
  salad = "salad",
  bacon = "bacon",
  cheese = "cheese",
  meat = "meat",
}

export type IngredientKeys = keyof typeof Ingredient;
type keys = "salad" | "bacon" | "cheese" | "meat";
export type Ingredients = { [index in keys]: any };
export type IngredientsCount = { [state in IngredientKeys]: boolean };

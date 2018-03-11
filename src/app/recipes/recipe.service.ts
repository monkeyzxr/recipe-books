import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Karaage',
      'Yummy!',
      'http://matsuri.us/wp-content/uploads/2014/12/kantkarra.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Lemon', 2)
      ]),
    new Recipe('Ika Karaage',
      'Looks strange?',
      'http://matsuri.us/wp-content/uploads/2014/12/k-ika-kara-age.jpg',
      [
        new Ingredient('Ika', 5),
        new Ingredient('Flour', 10)
      ]),
    new Recipe(
      'Shrimp Sushi',
      'Your favourite!',
      'http://matsuri.us/wp-content/uploads/2014/12/Shrimp-Sushi.jpg',
      [
        new Ingredient('Cooked Shrimp', 10),
        new Ingredient('Cooked Rice', 20)
      ]),
    new Recipe(
      'Tempura Yam Roll',
      'Come to have a try!',
      'http://matsuri.us/wp-content/uploads/2014/12/Yam-Tempura-Roll.jpg',
      [
        new Ingredient('Carrot', 5),
        new Ingredient('Cooked Rice', 20),
        new Ingredient('Sesame', 10)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

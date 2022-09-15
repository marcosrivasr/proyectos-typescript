<script setup lang="ts">
import { Unit, type Ingredient, type Recipe, type Step } from "@/types/types";
import { useRecipeStore } from "@/stores/recipeStore";
import { reactive, ref } from "vue";
import IngredientsView from "../components/IngredientsView.vue";
const recipe = reactive({});
const ingredients: Ingredient[] = reactive([]);
const steps: Step[] = reactive([]);

const recipeName = ref("");
const duration = ref(0);
const ingredientName = ref("");
const ingredientQty = ref("");
const ingredientUnit = ref("");

const stepText = ref("");

function handleClickIngredient(e: Event) {
  e.preventDefault();
  if (
    ingredientName.value !== "" &&
    ingredientQty.value !== "" &&
    ingredientUnit.value !== ""
  ) {
    const ingredient: Ingredient = {
      name: ingredientName.value,
      qty: ingredientQty.value,
      unit: getUnit(ingredientUnit.value),
    };
    ingredients.push(ingredient);
  }
}

function getUnit(value: string): Unit {
  switch (value) {
    case "ml":
      return Unit.kg;
    case "ml":
      return Unit.ml;
    case "l":
      return Unit.liters;
    default:
      return Unit.units;
  }
}

function handleClickStep(e: Event) {
  e.preventDefault();
  if (stepText.value !== "") {
    steps.push({ instruction: stepText.value });
  }
}

function handleClickRecipe(e: Event) {
  e.preventDefault();
  if (
    recipeName.value !== "" &&
    duration.value > 0 &&
    ingredients.length > 0 &&
    steps.length > 0
  ) {
    const recipe: Recipe = {
      id: crypto.randomUUID(),
      name: recipeName.value,
      duration: duration.value,
      ingredients: ingredients,
      steps: steps,
    };
    useRecipeStore().add(recipe);
  }
}
</script>

<template>
  <div class="create">
    <form action="">
      <label for="">Name of recipe</label>
      <input type="text" name="name" id="" v-model="recipeName" />

      <label for="">Duration (min)</label>
      <input type="number" id="" v-model="duration" />

      <h3>Ingredients</h3>
      <div>
        <label for="">Name of recipe</label>
        <input type="text" name="name" id="" v-model="ingredientName" />

        <label for="">Quantity</label>
        <input type="text" name="name" id="" v-model="ingredientQty" />
        <select v-model="ingredientUnit">
          <option value="ml">mililliters</option>
          <option value="kg">kilograms</option>
          <option value="l">liters</option></select
        >1

        <button @click="handleClickIngredient">Add ingredient</button>

        <div><IngredientsView :ingredients="ingredients" mode="view" /></div>
      </div>

      <h3>Steps</h3>
      <div>
        <label for="">Step</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="stepText"
        ></textarea>
        <button @click="handleClickStep">Add step</button>
      </div>
      <div>
        <ul>
          <li v-for="step in steps" key="crypto.randoUUID()">
            {{ step.instruction }}
          </li>
        </ul>
      </div>

      <button @click="handleClickRecipe">Add new Recipe</button>
    </form>
  </div>
</template>

<style>
label {
  display: block;
}
@media (min-width: 1024px) {
  .create {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

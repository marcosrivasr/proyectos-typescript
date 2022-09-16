<script setup lang="ts">
import { type Ingredient, type Recipe, type Step } from "@/types/types";
import { setUnit } from "@/utils/utils";
import { useRecipeStore } from "@/stores/recipeStore";
import { reactive, ref } from "vue";
import IngredientsView from "../components/IngredientsView.vue";
import StepsView from "../components/StepsView.vue";
const recipe = reactive({});
const ingredients: Ingredient[] = reactive([]);
let steps: Step[] = reactive([]);

const recipeName = ref("");
const duration = ref(0);
const ingredientName = ref("");
const ingredientQty = ref("");
const ingredientUnit = ref("");
const picture = ref("");

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
      unit: setUnit(ingredientUnit.value),
    };
    ingredients.push(ingredient);
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
      picture: picture.value,
    };
    useRecipeStore().add(recipe);
  }
}

function handlePictureChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (files?.length === 1) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = function () {
      picture.value = fileReader.result as string;
    };
  }
}

function handleRemoveStep(e: Event, text: string) {
  e.preventDefault();
  const index = steps.findIndex((item) => item.instruction !== text);
  steps.splice(index, 1);
}
function handleRemoveIngredient(e: Event, text: string) {
  e.preventDefault();
  const index = ingredients.findIndex((item) => item.name !== text);
  ingredients.splice(index, 1);
}
</script>

<template>
  <div class="create">
    <form action="">
      <label for="">Name of recipe</label>
      <input type="text" name="name" id="" v-model="recipeName" />

      <label for="">Duration (min)</label>
      <input type="number" id="" v-model="duration" />

      <label for="">Picture</label>
      <input type="file" @change="handlePictureChange" />
      <img :src="picture" width="100" alt="" />

      <h3>Ingredients</h3>
      <div>
        <label for="">Name of recipe</label>
        <input type="text" name="name" id="" v-model="ingredientName" />

        <label for="">Quantity</label>
        <div class="col">
          <input type="text" name="name" id="" v-model="ingredientQty" />
          <select v-model="ingredientUnit">
            <option value="ml">mililliters</option>
            <option value="kg">kilograms</option>
            <option value="l">liters</option>
            <option value="units">units</option>
          </select>
        </div>

        <button @click="handleClickIngredient">Add ingredient</button>

        <div>
          <IngredientsView
            :ingredients="ingredients"
            mode="edit"
            v-on:remove="handleRemoveIngredient"
          />
        </div>
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
        <StepsView :steps="steps" mode="edit" v-on:remove="handleRemoveStep" />
      </div>

      <button @click="handleClickRecipe">Add new Recipe</button>
    </form>
  </div>
</template>

<style scoped>
form {
  width: 400px;
  margin: 0 auto;
}
.col {
  display: flex;
  gap: 5px;
}
input,
textarea,
select {
  font-size: 18px;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  border: solid 2px #dbaf79;
  margin: 5px 0;
  background-color: blanchedalmond;
  color: #754b18;
}

button {
  border: solid 2px #0e9678;
  background-color: #19c29e;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 18px;
}
label {
  font-size: 16px;
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

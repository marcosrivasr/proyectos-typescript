<script setup lang="ts">
import { useRecipeStore } from "../stores/recipeStore";
import IngredientsView from "@/components/IngredientsView.vue";
import StepsView from "@/components/StepsView.vue";

function handleClick(e: Event, id: string) {
  e.preventDefault();

  useRecipeStore().loadRecipe(id);
}
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <ul>
        <li v-for="item in useRecipeStore().items" key="item.id">
          <a href="#" @click="(e) => handleClick(e, item.id)">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <main>
      <div v-if="useRecipeStore().currentRecipe.id">
        <h1>
          {{ useRecipeStore().currentRecipe.name }}
        </h1>
        <div class="ingredients">
          <h3>Ingredients</h3>
          <ul>
            <li
              v-for="ingredient in useRecipeStore().currentRecipe.ingredients"
            >
              {{ ingredient.name }}
            </li>
          </ul>
          <IngredientsView
            :ingredients="useRecipeStore().currentRecipe.ingredients!"
            mode="view"
          />
        </div>
        <div class="steps">
          <h3>Instructions</h3>
          <StepsView
            :steps="useRecipeStore().currentRecipe.steps!"
            mode="view"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.sidebar {
  width: 300px;
  position: fixed;
  left: 0;
  height: 100%;
  background-color: rgb(9, 43, 54);
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar a {
  display: block;
  padding: 10px;
}

.sidebar a:hover {
  background-color: white;
  color: black;
}

main {
  margin-left: 300px;
  padding: 20px;
}

h1 {
  font-size: 3rem;
}
</style>

<script setup lang="ts">
import { useRecipeStore } from "../stores/recipeStore";
import IngredientsView from "@/components/IngredientsView.vue";
import StepsView from "@/components/StepsView.vue";
import { reactive } from "vue";

const modalStyles = reactive({
  display: useRecipeStore().currentRecipe.id !== undefined ? "block" : "none",
});

function handleClick(e: Event, id: string) {
  e.preventDefault();

  useRecipeStore().loadRecipe(id);
}

function handleCloseModal() {
  useRecipeStore().closeRecipe();
  console.log(modalStyles);
}
</script>

<template>
  <div class="container">
    <div class="items">
      <ul>
        <li v-for="item in useRecipeStore().items" key="item.id">
          <a href="#" @click="(e) => handleClick(e, item.id)">
            <img :src="item.picture" width="200" alt="" />
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <main :style="modalStyles" v-if="useRecipeStore().currentRecipe.id">
      <div><button @click="handleCloseModal">Close</button></div>
      <div class="content">
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
.items {
  height: 100vh;
}
.items ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.items a {
  display: block;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  text-align: center;
  font-size: 22px;
}

.items a:hover {
  background-color: white;
  color: black;
}

.items a img {
  width: 500px;
  height: 300px;
  object-fit: cover;
  background-color: black;
}

main {
  padding: 20px;
  position: absolute;
  width: 100%;
  top: 0;
  height: 100vh;
  background-color: bisque;
}

main .content {
  width: 500px;
  margin: 0 auto;
}

main .content h1 {
  font-weight: bolder;
}
main .content h1,
main .content h3 {
  text-align: center;
}

h1 {
  font-size: 3rem;
}
</style>

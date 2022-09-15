import { reactive, computed, ref } from "vue";
import { defineStore } from "pinia";
import type { Recipe } from "@/types/types";
import type { ReactiveEffect } from "vue";

export const useRecipeStore = defineStore("recipeStore", () => {
  const items: Recipe[] = reactive([
    {
      id: crypto.randomUUID(),
      name: "enchiladas",
      duration: 15,
      unit: "min",
      ingredients: [],
      steps: [],
    },
  ]);

  const currentRecipe: Partial<Recipe> = reactive({});

  function add(item: Recipe) {
    items.push(item);
  }

  function loadRecipe(id: string) {
    const item = items.find((x) => x.id === id);
    if (item) {
      currentRecipe.id = item.id;
      currentRecipe.duration = item.duration;
      currentRecipe.ingredients = [...item.ingredients];
      currentRecipe.name = item.name;
      currentRecipe.steps = [...item.steps];
    }
  }

  return { add, items, currentRecipe, loadRecipe };
});

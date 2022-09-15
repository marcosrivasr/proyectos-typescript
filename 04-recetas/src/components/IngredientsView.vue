<script setup lang="ts">
import type { Ingredient } from "@/types/types";

interface IngredientsViewProps {
  ingredients: Partial<Ingredient>[];
  mode: "view" | "edit";
}

const { ingredients, mode } = defineProps<IngredientsViewProps>();
</script>

<template>
  <ul>
    <li v-for="ingredient in ingredients">
      {{ ingredient?.name }}
    </li>
  </ul>
</template>

<style></style>

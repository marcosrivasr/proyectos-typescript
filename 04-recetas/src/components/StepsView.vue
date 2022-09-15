<script setup lang="ts">
import type { Step } from "@/types/types";

interface StepsViewProps {
  steps: Partial<Step>[];
  mode: "view" | "edit";
}

const { steps, mode } = defineProps<StepsViewProps>();
</script>

<template>
  <ol>
    <li v-for="step in steps">
      {{ step?.instruction }}
    </li>
  </ol>
</template>

<style></style>

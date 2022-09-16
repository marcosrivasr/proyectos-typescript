<script setup lang="ts">
import type { Step } from "@/types/types";

interface StepsViewProps {
  steps: Partial<Step>[];
  mode: "view" | "edit";
  onRemove?: (e: Event, text: string) => void;
}

const { steps, mode } = defineProps<StepsViewProps>();
</script>

<template>
  <ol>
    <li v-for="step in steps">
      <div class="col">
        <span>{{ step?.instruction }}</span>
        <button
          v-if="mode === 'edit' && onRemove"
          @click="(e) => onRemove?.(e, step?.instruction!)"
        >
          Remove
        </button>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.col {
  display: flex;
}
li {
  padding: 5px 0;
}
span {
  flex: 1;
}
button {
  background-color: transparent;
  color: #754b18;
  padding: 5px;
  border: solid 1px #dbaf79;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background-color: red;
  color: white;
}
</style>

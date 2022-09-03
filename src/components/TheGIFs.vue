<script setup lang="ts">
import { defineProps } from "vue";
import type { Gif } from "@/types";
import TheGif from "./TheGif.vue";

defineProps<{
  gifs: Gif[];
}>();
</script>
<template>
  <div class="gallery">
    <TheGif v-for="gif in gifs" :key="gif.id" :gif="gif" />
  </div>
</template>
<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: row;
  gap: 10px;
}
</style>

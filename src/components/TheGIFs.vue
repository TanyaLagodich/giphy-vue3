<script setup lang="ts">
import { defineProps } from "vue";
import type { Gif } from "@/types";

defineProps<{
  gifs: Gif[];
}>();
</script>
<template>
  <div>
    <img
      v-for="gif in gifs"
      :key="gif.id"
      :src="gif.images.original.url"
      :alt="gif.title"
    />
  </div>
</template>

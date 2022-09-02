<script setup lang="ts">
import { defineProps } from "vue";
import type { Gif } from "@/types";

defineProps<{
  gifs: Gif[];
}>();
</script>
<template>
  <div class="gallery">
    <div v-for="gif in gifs" :key="gif.id" class="gallery__item">
      <figure>
        <img
          :src="gif.images.original.url"
          :alt="gif.title"
          class="gallery__img"
        />
      </figure>
      <div v-if="gif.user" class="gallery__overlay">
        <img
          class="gallery__user-avatar"
          :src="gif.user.avatar_url"
          :alt="gif.user.display_name"
        />
        <p>{{ gif.user.display_name }}</p>
        <span v-if="gif.user.is_verified">is_verified</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
  grid-gap: 10px;
}
.gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.gallery__item {
  position: relative;
  cursor: pointer;
}

.gallery__user-avatar {
  object-fit: cover;
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.gallery__overlay {
  position: absolute;
  bottom: 0;
}

.gallery__overlay::after {
  content: "";
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(18, 18, 18, 0.6));
  cursor: default;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75px;
  pointer-events: none;
}

/*.gallery__img:nth-child(5n){*/
/*  grid-column-end: span 2;*/
/*}*/
</style>

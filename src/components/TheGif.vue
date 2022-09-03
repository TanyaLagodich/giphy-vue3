<script setup lang="ts">
import type { Gif } from "@/types";
import { ref } from "vue";
import IconVerified from "./icons/IconVerified.vue";
import IconCopyLink from "./icons/IconCopyLink.vue";

const isLoadedImage = ref(false);

defineProps<{
  gif: Gif;
}>();

const loadImage = () => {
  isLoadedImage.value = true;
};
</script>
<template>
  <RouterLink
    :to="{ name: 'show-gif', params: { id: gif.id } }"
    class="gallery__item"
  >
    <img
      v-show="isLoadedImage"
      :src="gif.images.original.url"
      :alt="gif.title"
      class="gallery__img"
      @load="loadImage"
    />
    <div class="gallery__overlay">
      <div class="gallery__links">
        <IconCopyLink class="gallery__link" />
      </div>
      <div v-if="gif.user" class="gallery__user">
        <img
          class="gallery__user-avatar"
          :src="gif.user.avatar_url"
          :alt="gif.user.display_name"
        />
        <p>{{ gif.user.display_name }}</p>
        <IconVerified v-if="gif.user.is_verified" />
      </div>
      <div v-else-if="gif.tags">
        {{ gif.tags }}
      </div>
    </div>
  </RouterLink>
</template>
<style scoped>
.gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.gallery__img.loaded {
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
}

.gallery__img.placeholder {
  position: relative;
  width: 100%;
  filter: blur(10px);
  transform: scale(1);
}

.gallery__item {
  position: relative;
  cursor: pointer;
}

.gallery__item:hover .gallery__overlay {
  opacity: 1;
}

.gallery__links {
  align-self: flex-end;
}

.gallery__link {
  transform: scale(0.7);
  transition: all 0.3s ease;
  opacity: 0.9;
}

.gallery__link:hover {
  transform: scale(0.9);
  transition: transform 0.3s ease;
  opacity: 1;
}

.gallery__user {
  display: flex;
  align-items: center;
}

.gallery__user-avatar {
  object-fit: cover;
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.gallery__overlay {
  padding: 10px;
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery__overlay::before {
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
</style>

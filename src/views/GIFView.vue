<script setup lang="ts">
import { getGifById } from "@/api";
import { ref } from "vue";
import useFetch from "@/composables/useFetch";

const props = defineProps<{
  id: number;
}>();

const showInformation = ref(false);

const { data: gif, fetch: getGIF } = useFetch(getGifById, { skip: true });
getGIF(props.id);
</script>
<template>
  <div v-if="gif" class="gif">
    <h2 class="gif__title">
      {{ gif.title }} <span @click="showInformation = !showInformation">…</span>
    </h2>
    <div class="gif__information" :class="{ visible: showInformation }">
      <div>
        <p>
          Source: {{ gif.images.original.width }} x
          {{ gif.images.original.height }}px
        </p>
        <p>Size: {{ Number(gif.images.original.size / 1e6).toFixed(2) }}Mb</p>
        <p>Frames: {{ gif.images.original.frames }}</p>
      </div>
      <div>
        <p>Uploaded: {{ gif.import_datetime }}</p>
        <p>Rating: {{ gif.rating.toUpperCase() }}</p>
      </div>
    </div>
    <img :src="gif.images.original.url" :alt="gif.title" />
  </div>
</template>
<style scoped>
.gif__title {
  color: #a6a6a6;
  font-size: 14px;
  letter-spacing: 0.01em;
  text-transform: capitalize;
  font-weight: 600;
}

.gif__title span {
  cursor: pointer;
}

.gif__information {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(0, 0, 0, 0.9);
  box-sizing: border-box;
  font-size: 14px;
  left: 6px;
  line-height: 1.3;
  margin-top: 6px;
  overflow: hidden;
  padding: 15px;
  right: 6px;
  top: 17px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gif__information.visible {
  opacity: 1;
}

.gif__information p {
  margin-bottom: 10px;
}
</style>

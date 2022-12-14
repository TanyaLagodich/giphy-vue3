<script setup lang="ts">
import { computed } from "vue";
import IconGif from "./icons/IconGif.vue";
import IconSticker from "./icons/IconSticker.vue";
import { uploadTypes } from "@/types";
import { useStore } from "@/store";
import router from "@/router";

const props = defineProps<{
  type: uploadTypes;
}>();

const { saveFile } = useStore();

const description = computed(() =>
  props.type === uploadTypes.GIF
    ? "Upload a GIF, MP4, or MOV."
    : "Upload a GIF with transparency."
);

const title = computed(() => {
  if (props.type === uploadTypes.GIF) {
    return props.type.toUpperCase();
  } else {
    return props.type.slice(0, 1).toUpperCase() + props.type.slice(1);
  }
});

const getCurrentIcon = computed(() =>
  props.type === uploadTypes.GIF ? IconGif : IconSticker
);

const readFile = async (event) => {
  const file = event.target.files[0];
  await saveFile(file);
  router.push({ name: "upload-finalize" });
};
</script>
<template>
  <div class="upload__file">
    <component :is="getCurrentIcon" class="upload__icon" />
    <h2 class="upload__title">{{ title }}</h2>
    <p class="upload__description">{{ description }}</p>
    <label for="upload" class="upload__label">Choose File</label>
    <input type="file" class="upload__input" id="upload" @change="readFile" />
  </div>
</template>
<style scoped>
.upload__file {
  padding-top: 20px;
  background: rgba(236, 236, 236, 0.1);
  border-radius: 4px;
  font-size: 15px;
  margin-right: 15px;
  flex-basis: 50%;
}
.upload__label {
  display: block;
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.15);
  box-sizing: border-box;
}
.upload__input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
}

.upload__icon {
  width: 26px;
  height: 26px;
}
</style>

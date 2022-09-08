<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
<template>
  <div class="upload">
    <h2 class="upload__title">Any URL</h2>
    <p class="upload__description">
      We support media URLs from GIPHY, YouTube, Vimeo, & many others!
    </p>
    <input
      :value="modelValue"
      class="upload__url-input"
      type="text"
      placeholder="Enter any media or GIF URL"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<style scoped>
.upload__url-input {
  padding: 0 12px;
  background: rgb(255, 255, 255);
  border: 1px solid white;
  border-radius: 2px;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
}
</style>

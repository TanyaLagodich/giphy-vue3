<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
<template>
  <div class="upload__url">
    <h2 class="upload__url-title">Any URL</h2>
    <p class="upload__url-description">
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
.upload__url {
  background: rgba(236, 236, 236, 0.1);
  border-radius: 4px;
  padding: 20px 40px 30px;
  text-align: initial;
}

.upload__url-title {
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 900;
}

.upload__url-description {
  margin-bottom: 12px;
}

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

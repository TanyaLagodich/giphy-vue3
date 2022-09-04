<script setup lang="ts">
import IconClose from "./icons/IconClose.vue";
defineProps<{
  tag: string;
  index: number;
  close: boolean;
}>();

defineEmits<{
  (e: "@close", index: number): void;
}>();
</script>
<template>
  <div class="tag">
    <span> #{{ tag }} </span>
    <span v-if="close" class="tag__close" @click="$emit('@close', index)">
      X
    </span>
  </div>
</template>
<style scoped>
.tag {
  margin: 0px 8px 10px 0px;
  background: rgb(46, 46, 46);
  border-radius: 20px;
  box-sizing: border-box;
  color: rgb(216, 216, 216);
  display: inline-block;
  font-size: 15px;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
  max-width: 100%;
  overflow: hidden;
  padding: 0px 36px 0px 20px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: flex;
  align-items: center;
  width: fit-content;
}

.tag__close {
  border-radius: 50%;
  color: rgb(255, 255, 255);
  cursor: pointer;
  font-size: 11px;
  transition: all 0.3s ease;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  bottom: 10px;
}

.tag__close:hover {
  background: rgb(0, 0, 0);
}
</style>

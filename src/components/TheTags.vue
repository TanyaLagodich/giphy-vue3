<script setup lang="ts">
import { defineProps } from "vue";
import { searchHashtags } from "@/api";
import useFetch from "@/composables/useFetch";

const props = defineProps<{
  modelValue: string;
  path: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "@search"): void;
}>();

const { response: hashtags, fetch: getHashtags } = useFetch(searchHashtags, {
  skip: true,
});
getHashtags(props.path);

const searchNewItems = ({ name }) => {
  emits("update:modelValue", name);
  emits("@search");
};
</script>
<template>
  <div v-if="hashtags" class="hashtags">
    <button
      v-for="hashtag in hashtags.data.slice(0, 4)"
      :key="hashtag.analytics_response_payload"
      class="hashtags__item"
      @click="searchNewItems(hashtag)"
    >
      #{{ hashtag.name }}
    </button>
  </div>
</template>
<style scoped>
.hashtags {
  display: flex;
  align-items: center;
}

.hashtags__item {
  padding: 11px 16px;
  background-color: rgb(46, 46, 46);
  border: 1px solid transparent;
  color: var(--vt-c-white);
  border-radius: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.hashtags__item:not(:last-child) {
  margin-right: 8px;
}

.hashtags__item:hover {
  color: rgb(0, 230, 204);
}
</style>

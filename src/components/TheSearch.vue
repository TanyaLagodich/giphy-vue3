<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import IconSearch from "./icons/IconSearch.vue";
import useSearch from "@/composables/useSearch";

const searchText = ref("");
const { tags, fetch: search } = useSearch();
// TODO debounce on keyup https://theroadtoenterprise.com/blog/how-to-create-a-debounced-ref-in-vue-3-using-composition-api

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  "update:modelValue": () => void;
}>();
</script>
<template>
  <div>
    <div class="search">
      <input v-model="searchText" type="text" />
      <button @click="search(searchText)">
        <IconSearch />
      </button>
    </div>
    <ul class="autocomplete">
      <li v-for="tag in tags" :key="tag">{{ tag.name }}</li>
    </ul>
  </div>
</template>
<style scoped>
.search {
  display: flex;
  border-radius: 4px;
  background-color: var(--vt-c-white);
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 0 17px;
  min-height: 52px;
  border: none;
  background-color: transparent;
}

button {
  background: linear-gradient(
    45deg,
    rgb(153, 51, 255) 0%,
    rgb(255, 102, 102) 100%
  );
  border-radius: 4px;
  outline: none;
  border: 1px solid transparent;
  cursor: pointer;
}

.autocomplete {
  margin-top: 1px;
  padding-left: 0;
  list-style-type: none;
  border-radius: 4px;
  background-color: var(--vt-c-white);
  color: var(--vt-c-black);
}

.autocomplete li {
  padding: 10px 17px;
  min-height: 52px;
}

.autocomplete li:not(:last-child) {
  border-bottom: 1px dashed black;
}
</style>

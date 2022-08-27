<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";
import IconSearch from "./icons/IconSearch.vue";
import useAutocomplete from "@/composables/useSearch";

const inputOnBlur = ref(false);
const searchText = ref("");
const { tags, fetch: autocomplete } = useAutocomplete();
// TODO debounce on keyup https://theroadtoenterprise.com/blog/how-to-create-a-debounced-ref-in-vue-3-using-composition-api

const placeholder = computed(() => "Search ALL the GIFs and Stickers");

const selectTag = ({ name }) => {
  searchText.value = name;
  inputOnBlur.value = false;
};

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  "update:modelValue": () => void;
  "@search": (query: string) => void;
}>();
</script>
<template>
  <div>
    <div class="search">
      <input
        v-model="searchText"
        type="text"
        :placeholder="placeholder"
        @focus="inputOnBlur = true"
        @keyup="autocomplete(searchText)"
        @blur="inputOnBlur = false"
      />
      <button @click="$emit('@search', searchText)">
        <IconSearch />
      </button>
    </div>
    <ul v-if="tags.length && inputOnBlur" class="autocomplete">
      <li v-for="tag in tags" :key="tag" @mousedown="selectTag(tag)">
        {{ tag.name }}
      </li>
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
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 1px;
  padding-left: 0;
  list-style-type: none;
  border-radius: 4px;
  background-color: var(--vt-c-white);
  color: var(--vt-c-black);
  z-index: 1;
}

.autocomplete li {
  padding: 10px 17px;
  min-height: 52px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.autocomplete li:hover {
  background-color: var(--vt-c-white-soft);
  color: var(--vt-c-black);
}

.autocomplete li:not(:last-child) {
  border-bottom: 1px dashed black;
}
</style>

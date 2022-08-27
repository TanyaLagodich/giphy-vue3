<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";
import IconSearch from "./icons/IconSearch.vue";
import useAutocomplete from "@/composables/useSearch";

const inputOnBlur = ref(false);
const searchText = ref("");
const { tags, fetch: autocomplete } = useAutocomplete();
const timer = ref(0);
// TODO debounce on keyup https://theroadtoenterprise.com/blog/how-to-create-a-debounced-ref-in-vue-3-using-composition-api

const placeholder = computed(() => "Search ALL the GIFs and Stickers");

const selectTag = ({ name }) => {
  searchText.value = name;
  inputOnBlur.value = false;
};

const selectLetterInTag = ({ name }) => {
  const index = name.indexOf(searchText.value);
  if (index === -1) {
    return name;
  }
  const length = searchText.value.length;
  return `<span class="autocomplete__item_bold">${name.slice(
    index,
    length
  )}</span>${name.slice(length)}`;
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
    <ul v-if="tags.length && true" class="autocomplete">
      <li
        v-for="tag in tags"
        :key="tag"
        @mousedown="selectTag(tag)"
        class="autocomplete__item"
        v-html="selectLetterInTag(tag)"
      />
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

.autocomplete__item {
  padding: 10px 17px;
  min-height: 52px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.autocomplete__item >>> .autocomplete__item_bold {
  font-weight: 600;
}

.autocomplete__item:hover {
  background-color: var(--vt-c-white-soft);
  color: var(--vt-c-black);
}

.autocomplete__item:not(:last-child) {
  border-bottom: 1px dashed black;
}
</style>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";
import useAutocomplete from "@/composables/useSearch";

const inputOnBlur = ref(false);
const { tags, fetch: autocomplete } = useAutocomplete();
const timer = ref(0);
// TODO debounce on keyup https://theroadtoenterprise.com/blog/how-to-create-a-debounced-ref-in-vue-3-using-composition-api

const placeholder = computed(() => "Search ALL the GIFs and Stickers");

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "@search"): void;
}>();

const props = defineProps<{
  modelValue: string;
}>();

const debounceAutocomplete = () => {
  if (props.modelValue) {
    clearTimeout(timer.value);
    timer.value = setTimeout(() => autocomplete(props.modelValue), 400);
  }
};

const input = (event: Event) => {
  emit("update:modelValue", event.target.value);
  debounceAutocomplete();
};

const search = (event: Event) => {
  emit("@search");
  event.target.blur();
};

const selectTag = ({ name }) => {
  emit("update:modelValue", name);
  inputOnBlur.value = false;
  emit("@search");
};

const selectLetterInTag = ({ name }) => {
  const index = name.indexOf(props.modelValue);
  if (index === -1) {
    return name;
  }
  const length = props.modelValue.length;
  return `<span class="autocomplete__item_bold">${name.slice(
    index,
    length
  )}</span>${name.slice(length)}`;
};
</script>
<template>
  <div class="autocomplete">
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="autocomplete__input"
      @focus="inputOnBlur = true"
      @blur="inputOnBlur = false"
      @input="input"
      @keyup.enter="search"
    />
    <ul v-if="tags.length && inputOnBlur" class="autocomplete__list">
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
.autocomplete {
  flex-grow: 1;
}

.autocomplete__input {
  padding: 0 17px;
  width: 100%;
  box-sizing: border-box;
  min-height: 52px;
  border: none;
  background-color: transparent;
}

.autocomplete__list {
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

<script setup lang="ts">
import { ref } from "vue";
import TheSearch from "../components/TheSearch.vue";

const searchText = ref("");
</script>

<template>
  <main>
    <TheSearch v-model="searchText" />
  </main>
</template>

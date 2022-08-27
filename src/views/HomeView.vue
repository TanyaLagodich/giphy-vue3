<script setup lang="ts">
import { ref } from "vue";
import TheSearch from "../components/TheSearch.vue";
import useFetch from "@/composables/useFetch";
import { searchGifs } from "@/api";
import TheGIFs from "../components/TheGIFs.vue";

const { response, fetch: searchGifsByQuery } = useFetch(searchGifs, {
  skip: true,
});

const searchText = ref("");
</script>

<template>
  <main>
    <TheSearch
      v-model="searchText"
      @@search="(query) => searchGifsByQuery(query)"
    />
    <TheGIFs :gifs="response.data" />
  </main>
</template>

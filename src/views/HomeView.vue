<script setup lang="ts">
import { ref } from "vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import TheSearch from "../components/TheSearch.vue";
import useFetch from "@/composables/useFetch";
import { searchGifs } from "@/api";
import TheGIFs from "../components/TheGIFs.vue";
import TheTabs from "../components/TheTabs.vue";

const { response, fetch: searchGifsByQuery } = useFetch(searchGifs, {
  skip: true,
});

const searchText = ref("");
</script>

<template>
  <main>
    <div class="search">
      <TheSearch
        v-model="searchText"
        @@search="(query) => searchGifsByQuery(query)"
      />
      <button>
        <IconSearch />
      </button>
    </div>
    <div v-if="response">
      <h1>
        Here will be a title
        <span>{{ response.pagination.total_count }} GIFs</span>
      </h1>
    </div>
    <TheTabs />
    <TheGIFs v-if="response" :gifs="response.data" />
  </main>
</template>
<style scoped>
.search {
  display: flex;
  border-radius: 4px;
  background-color: var(--vt-c-white);
  width: 100%;
}

.search button {
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
</style>

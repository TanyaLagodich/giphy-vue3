<script setup lang="ts">
import { ref } from "vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import TheSearch from "../components/TheSearch.vue";
import useFetch from "@/composables/useFetch";
import { searchGifs } from "@/api";
import TheGIFs from "../components/TheGIFs.vue";
import TheTabs from "../components/TheTabs.vue";
import TheTags from "@/components/TheTags.vue";

const searchText = ref("");

const { response, fetch: searchGifsByQuery } = useFetch(searchGifs, {
  params: searchText,
  skip: true,
});
</script>

<template>
  <main>
    <div class="search">
      <TheSearch
        v-model="searchText"
        @@search="searchGifsByQuery(searchText)"
      />
      <button>
        <IconSearch />
      </button>
    </div>
    <div v-if="response">
      <div class="top">
        <h1 class="title">
          {{ searchText }}
          <span>{{ response.pagination.total_count }} GIFs</span>
        </h1>
        <TheTags
          v-model="searchText"
          :path="searchText"
          @@search="searchGifsByQuery(searchText)"
        />
      </div>
      <TheTabs />
      <TheGIFs v-if="response" :gifs="response.data" />
    </div>
  </main>
</template>
<style scoped>
.search {
  margin: 10px 0 15px;
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

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 36px;
}

.title span {
  color: var(--vt-c-dark-hint);
  padding-left: 0.4em;
  text-transform: none;
  font-size: 14px;
  white-space: pre;
  font-family: interface;
  font-weight: 700;
}
</style>

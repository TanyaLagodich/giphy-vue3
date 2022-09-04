<script setup lang="ts">
import { ref, computed } from "vue";
import UploadUrl from "../components/UploadUrl.vue";
import UploadFinalize from "../components/UploadFinalize.vue";
const link = ref("");

const isLinkValid = computed(() => link.value && link.value.includes(".gif"));
</script>
<template>
  <div class="upload" v-if="!isLinkValid">
    <h1 class="upload__title">GIPHY Upload</h1>
    <p class="upload__description">
      Upload your collection to share on Facebook, Twitter, Instagram, text
      message, email, & everywhere else.
    </p>
    <UploadUrl v-model="link" />
  </div>
  <UploadFinalize v-else :url="link" />
</template>
<style scoped>
.upload {
  background: linear-gradient(
    45deg,
    rgb(97, 87, 255) 0%,
    rgb(0, 204, 255) 100%
  );
  text-align: center;
}

.upload__title {
  font-size: 36px;
}

.upload__description {
  line-height: 1.3;
  margin-bottom: 12px;
}
</style>

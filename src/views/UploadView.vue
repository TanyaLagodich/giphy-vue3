<script setup lang="ts">
import { ref, computed } from "vue";
import UploadUrl from "../components/UploadUrl.vue";
import UploadFile from "@/components/UploadFile.vue";
import UploadFinalize from "../components/UploadFinalize.vue";
import { useStore } from "@/store";

const link = ref("");
const { getFileUrl, getFile, saveFile, saveFileUrl } = useStore();
const isLinkValid = computed(
  () =>
    link.value && (link.value.includes(".gif") || link.value.startsWith("blob"))
);
</script>
<template>
  <div class="upload__wrapper" v-if="!getFileUrl">
    <h1 class="upload__main-title">GIPHY Upload</h1>
    <p class="upload__main-description">
      Upload your collection to share on Facebook, Twitter, Instagram, text
      message, email, & everywhere else.
    </p>
    <div class="upload-file__wrapper">
      <UploadFile type="gif" v-model="link" />
      <UploadFile type="sticker" v-model="link" />
    </div>
    <UploadUrl v-model="link" />
  </div>
  <UploadFinalize v-else :url="link" />
</template>
<style scoped>
.upload__wrapper {
  padding: 60px 80px 40px;
  background: linear-gradient(
    45deg,
    rgb(97, 87, 255) 0%,
    rgb(0, 204, 255) 100%
  );
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 50%) 0px 11px 30px;
  text-align: center;
}
.upload-file__wrapper {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.upload__main-title {
  margin-bottom: 15px;
  font-size: 36px;
}

.upload__main-description {
  line-height: 1.3;
  max-width: 400px;
  margin: 0 auto 12px;
}
</style>

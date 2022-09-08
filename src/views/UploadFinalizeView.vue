<script setup lang="ts">
import { ref } from "vue";
import { uploadToGiphy } from "@/api";
import { useRouter } from "vue-router";
import TheTag from "@/components/TheTag.vue";
import axios from "axios";
import { useStore } from "@/store";

const router = useRouter();
const props = defineProps<{
  url: string;
}>();

const { getFileUrl, getFile } = useStore();

const tag = ref("");
const tags = ref<string[]>([]);

const addTag = () => {
  if (!tag.value) {
    return;
  }

  tags.value.push(tag.value);
  tag.value = "";
};

const upload = async () => {
  const data = {
    tags: tags.value.join(", "),
    source_image_url: props.url,
    source_post_url: props.url,
  };

  if (getFile) {
    data.file = getFile;
  }

  uploadToGiphy(data)
    .then(({ data }) =>
      router.push({ name: "show-gif", params: { id: data.id } })
    )
    .catch((err) => console.log(err));
};
</script>
<template>
  <div class="upload-finalize">
    <div class="upload-finalize__img">
      <img :src="getFileUrl" alt="loading image" />
    </div>
    <div class="upload-finalize__info">
      <h2>Add Info</h2>
      <div class="upload-finalize__tags">
        <label for="tag">Add Tags</label>
        <div class="upload-finalize__input">
          <input
            v-model="tag"
            type="text"
            id="tags"
            placeholder="Add tags"
            @keydown.enter="addTag"
          />
          <button :disabled="!tag.length" @click="addTag">+</button>
        </div>
        <TheTag
          v-for="(tag, index) in tags"
          :key="index"
          :tag="tag"
          :index="index"
          @@close="() => tags.splice(index, 1)"
          close
        />
        <p class="upload-finalize__hint">
          Tags help find your content later. Separate with commas to add
          multiple tags.
        </p>
      </div>

      <button class="upload__btn" @click="upload">Upload to GIPHY</button>
    </div>
  </div>
</template>
<style scoped>
.upload-finalize {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

img {
  width: 100%;
  object-fit: contain;
}

label {
  display: block;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  color: rgb(166, 166, 166);
}

input {
  padding: 0px 12px;
  border-radius: 2px;
  border: 1px solid white;
  font-size: 15px;
  height: 36px;
  background-color: transparent;
}

.upload-finalize__info {
  padding: 50px 30px 30px;
  background: rgb(33, 33, 33);
}

.upload-finalize__hint {
  padding: 15px 0px 0px;
  font-size: 11px;
  color: rgb(166, 166, 166);
}

.upload-finalize__input {
  border-radius: 2px;
  border: 1px solid white;
  background-color: white;
  display: grid;
  grid-template-columns: 90% 10%;
}

.upload-finalize__input button {
  background: rgb(97, 87, 255);
  border-radius: 2px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
  color: white;
  font-size: 26px;
}

.upload-finalize__input button[disabled] {
  background: gray;
}

.upload__btn {
  background: linear-gradient(
      45deg,
      rgb(97, 87, 255) 0%,
      rgb(153, 51, 255) 33%,
      rgb(97, 87, 255) 66%,
      rgb(153, 51, 255) 100%
    )
    0px 100% / 300% 300%;
  width: 100%;
  padding: 10px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}
</style>

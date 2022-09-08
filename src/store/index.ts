import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStore = defineStore("main", () => {
  const fileUrl = ref("");
  const file = ref<File | null>(null);

  const getFileUrl = computed(() => fileUrl.value);
  const getFile = computed(() => file.value);

  const saveFileUrl = (url: string) => (fileUrl.value = url);
  const saveFile = (file: File) => (file.value = file);

  return {
    getFileUrl,
    getFile,
    saveFileUrl,
    saveFile,
  };
});

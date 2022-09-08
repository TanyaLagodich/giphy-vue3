import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStore = defineStore("main", () => {
  const fileUrl = ref("");
  const file = ref<File | null>(null);

  const getFileUrl = computed(() => fileUrl.value);
  const getFile = computed(() => file.value);

  const saveFileUrl = (url: string) => {
    fileUrl.value = url;
    console.log(fileUrl.value);
  };

  const saveFile = async (uploadFile: File) => {
    file.value = uploadFile;
    console.log(uploadFile);
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = async () => {
      const blobFile = await fetch(reader.result).then((r) => r.blob());
      const link = URL.createObjectURL(blobFile);
      saveFileUrl(link);
    };
  };

  return {
    getFileUrl,
    getFile,
    saveFileUrl,
    saveFile,
  };
});

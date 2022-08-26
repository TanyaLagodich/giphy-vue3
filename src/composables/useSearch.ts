import { ref } from "vue";
import { searchTags } from "@/api";

const useSearch = () => {
  const tags = ref([]);

  const fetch = async (searchText: string) => {
    const { data } = await searchTags(searchText);
    tags.value = data;
  };

  return {
    tags,
    fetch,
  };
};

export default useSearch;

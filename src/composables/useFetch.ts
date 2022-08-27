import { ref } from "vue";

const useFetch = (apiMethod: any, config: { skip?: boolean } = {}) => {
  const data: any = ref(null);
  const response = ref<any>(null);
  const error: any = ref(null);
  const loading: any = ref(false);

  const fetch = async (query?: any) => {
    loading.value = true;
    try {
      const result = await apiMethod(query);
      response.value = result;
      data.value = result.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  if (!config.skip) {
    fetch();
  }

  return {
    data,
    response,
    error,
    loading,
    fetch,
  };
};

export default useFetch;

import { isMemberExpressionBrowser } from "@vue/compiler-core";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.giphy.com/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log({ config });
    if (!config.params) {
      config.params = {};
    }
    config.params.api_key = import.meta.env.VITE_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* for tags */
export async function searchHashtags(path: string) {
  return axiosInstance
    .request({
      method: "GET",
      url: `tags/related/${path}`,
    })
    .then((response) => response.data);
}

/* for autocomplete */
export async function searchTags(q: string) {
  return axiosInstance
    .request({
      method: "GET",
      url: "gifs/search/tags",
      params: {
        q,
      },
    })
    .then((response) => response.data);
}

export async function searchGifs(q: string) {
  return axiosInstance
    .request({
      method: "GET",
      url: "gifs/search",
      params: {
        q,
      },
    })
    .then((response) => response.data);
}

export default axiosInstance;

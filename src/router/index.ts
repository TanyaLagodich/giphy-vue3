import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/gifs/:id",
      name: "show-gif",
      component: () => import("@/views/GIFView.vue"),
      props: true,
    },
    {
      path: "/upload",
      name: "upload",
      component: () => import("@/views/UploadView.vue"),
    },
    {
      path: "/upload-finalize",
      name: "upload-finalize",
      component: () => import("@/views/UploadFinalizeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;

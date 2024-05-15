import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ProjectListView from "@/views/ProjectListView.vue";
import ErrorView from "@/views/ErrorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectListView
    },
    {
      path: "/:pathMatch(.*)",
      name: "error",
      component: ErrorView
    }
  ]
})

export default router

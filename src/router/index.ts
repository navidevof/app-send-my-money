import { auth } from "@/firebase";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const pages: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/register/index.vue"),
    children: [
      {
        path: "/register",
        name: "register",
        component: () => import("@/pages/register/Register.vue"),
      },
      {
        path: "/register/account/config-name",
        name: "account-config-name",
        component: () => import("@/pages/register/ConfigName.vue"),
      },
      {
        path: "/register/account/config-methods",
        name: "account-config-methods",
        component: () => import("@/pages/register/ConfigMethods.vue"),
      },
      {
        path: "/register/account/preview",
        name: "account-preview",
        component: () => import("@/pages/register/Preview.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/Login.vue"),
  },
  {
    path: "/page/:url",
    name: "page",
    component: () => import("@/pages/page/index.vue"),
  },
];

const routes: Array<RouteRecordRaw> = [
  ...pages,
  {
    path: "/",
    name: "home",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/",
        name: "editor",
        component: () => import("@/views/Editor.vue"),
      },
      {
        path: "/stats",
        name: "stats",
        component: () => import("@/views/Stats.vue"),
        children: [],
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }

  if ((to.path === "/register" || to.path === "/login") && auth.currentUser) {
    next("/");
    return;
  }

  next();
});

export default router;

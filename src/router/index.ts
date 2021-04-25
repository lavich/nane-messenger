import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { loginGuard } from "./loginGuard";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/chats",
    component: () =>
      import(/* webpackChunkName: "chats" */ "../views/Chats.vue"),
    beforeEnter: loginGuard,
    children: [
      {
        path: ":id",
        name: "Room",
        component: () =>
          import(/* webpackChunkName: "chats" */ "../views/Room.vue"),
        beforeEnter: loginGuard,
      },
      {
        path: "",
        name: "NewRoom",
        component: () => import("../views/NewRoom.vue"),
      },
    ],
  },
  {
    path: "*",
    redirect: "/chats",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

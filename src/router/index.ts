import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/chats",
    name: "Chats",
    component: () =>
      import(/* webpackChunkName: "chats" */ "../views/Chats.vue"),
    children: [
      {
        path: ":id",
        name: "Room",
        component: () =>
          import(/* webpackChunkName: "chats" */ "../views/Room.vue"),
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

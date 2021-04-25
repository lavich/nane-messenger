import { NavigationGuard } from "vue-router";
import { accessor } from "@/store";

export const loginGuard: NavigationGuard = (to, from, next) => {
  const isAuth = accessor.User.name;
  if (!isAuth) return next({ name: "Login" });
  else next();
};

import { NavigationGuard } from "vue-router";
import { accessor } from "@/store";

export const logoutGuard: NavigationGuard = (to, from, next) => {
  accessor.logout();
  next({ name: "Login" });
};

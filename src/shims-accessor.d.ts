import { accessor } from "./store";

declare module "vue/types/vue" {
  interface Vue {
    readonly $accessor: typeof accessor;
  }
}

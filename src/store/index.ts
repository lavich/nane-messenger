import Vue from "vue";
import Vuex from "vuex";
import { useAccessor } from "typed-vuex";

import * as User from "./User";
Vue.use(Vuex);

const storePattern = {
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    User,
  },
};

const store = new Vuex.Store(storePattern);

export const accessor = useAccessor(store, storePattern);

// Optionally, inject accessor globally
Vue.prototype.$accessor = accessor;

export default store;

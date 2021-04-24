import Vue from "vue";
import Vuex from "vuex";
import { actionTree, getterTree, mutationTree, useAccessor } from "typed-vuex";

import * as User from "./User";
import * as Rooms from "./Rooms";
import { Settings } from "@/types";
import { getSettings } from "@/api";

Vue.use(Vuex);

const state = () => ({
  settings: {} as Settings,
});
const getters = getterTree(state, {});
const mutations = mutationTree(state, {
  SET_SETTINGS(state, settings: Settings) {
    state.settings = settings;
  },
});
const actions = actionTree(
  { state, getters, mutations },
  {
    async getSettings({ commit }) {
      const settings = await getSettings();
      commit("SET_SETTINGS", settings);
    },
  }
);

const storePattern = {
  state,
  getters,
  mutations,
  actions,
  modules: {
    User,
    Rooms,
  },
};

const store = new Vuex.Store(storePattern);

export const accessor = useAccessor(store, storePattern);

// Optionally, inject accessor globally
Vue.prototype.$accessor = accessor;

export default store;

import Vue from "vue";
import Vuex, { Plugin } from "vuex";
import { actionTree, getterTree, mutationTree, useAccessor } from "typed-vuex";

import * as User from "./User";
import * as Rooms from "./Rooms";
import * as WS from "./WS";
import { Settings } from "@/types";
import { getSettings } from "@/api";

Vue.use(Vuex);

interface State {
  settings: Settings;
}

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
    login({ dispatch }, userName: string) {
      dispatch("User/setName", userName, { root: true });
      dispatch("WS/connect", userName, { root: true });
    },
    logout({ dispatch }) {
      dispatch("User/setName", "", { root: true });
      dispatch("WS/disconnect", null, { root: true });
    },
  }
);

// Подписка на получение сообщений
const subscribeOnWS: Plugin<State> = (store) => {
  store.subscribe((mutation) => {
    if (mutation.type === "WS/SOCKET_ONMESSAGE") {
      store.commit("Rooms/ADD_MESSAGE", mutation.payload);
    }
  });
};

const storePattern = {
  state,
  getters,
  mutations,
  actions,
  modules: {
    User,
    Rooms,
    WS,
  },
  plugins: [subscribeOnWS],
};

const store = new Vuex.Store(storePattern);

export const accessor = useAccessor(store, storePattern);

// Optionally, inject accessor globally
Vue.prototype.$accessor = accessor;

export default store;

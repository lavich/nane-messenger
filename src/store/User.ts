import { actionTree, getterTree, mutationTree } from "typed-vuex";

interface State {
  // User name
  name: string;
}

export const namespaced = true;
export const state = (): State => ({
  name: "",
});

export const getters = getterTree(state, {});

export const mutations = mutationTree(state, {
  SET_NAME(state, newName: string) {
    state.name = newName;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    setName({ commit }, newName: string) {
      commit("SET_NAME", newName);
    },
  }
);

import { actionTree, getterTree, mutationTree } from "typed-vuex";

interface State {
  socket: {
    isConnected: boolean;
    message: string;
    reconnectError: boolean;
  };
}

export const state = (): State => ({
  socket: {
    isConnected: false,
    message: "",
    reconnectError: false,
  },
});

export const namespaced = true;
export const getters = getterTree(state, {
  message: (state: State) => state.socket.message,
});

export const mutations = mutationTree(state, {
  SOCKET_ONOPEN(state) {
    // Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
  },
  SOCKET_ONCLOSE(state) {
    state.socket.isConnected = false;
  },
  SOCKET_ONERROR(state, event) {
    console.error(state, event);
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE(state, message) {
    state.socket.message = message;
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT(state, count) {
    console.info(state, count);
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    // setName({ commit }, newName: string) {
    //   commit("SET_NAME", newName);
    // },
  }
);

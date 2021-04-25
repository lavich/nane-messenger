import { actionTree, getterTree, mutationTree } from "typed-vuex";
import { ClientMessage } from "@/types";

interface State {
  $socket: WebSocket | null;
  socket: {
    isConnected: boolean;
    message: string;
    reconnectError: boolean;
  };
}

export const state = (): State => ({
  $socket: null,
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
  SOCKET_ONOPEN(state, event: Event) {
    state.$socket = event.currentTarget as WebSocket;
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
    connect(_, userName: string) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._vm.$connect("wss://nane.tada.team/ws" + `?username=${userName}`);
    },
    disconnect() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._vm.$disconnect();
    },
    sendMessage({ state }, message: ClientMessage) {
      state.$socket?.send(JSON.stringify(message));
    },
  }
);

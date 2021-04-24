import { actionTree, getterTree, mutationTree } from "typed-vuex";
import { getRoomHistory, getRooms } from "@/api";
import { Room, ServerMessage } from "@/types";

interface State {
  rooms: Room[];
}

export const state = (): State => ({
  rooms: [],
});

export const getters = getterTree(state, {
  room: (state: State, roomName: string) =>
    state.rooms.find((room) => room.name === roomName),
});

export const mutations = mutationTree(state, {
  SET_ROOMS(state, rooms: Room[]) {
    state.rooms = rooms;
  },
  SET_HISTORY_ROOM(
    state,
    { roomName, messages }: { roomName: string; messages: ServerMessage[] }
  ) {
    state.rooms = state.rooms.map((room) =>
      room.name !== roomName ? room : { name: roomName, messages }
    );
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getRooms({ commit }) {
      const rooms = await getRooms();
      const modifyRooms: Room[] = rooms.map((room) => ({
        name: room.name,
        messages: [room.last_message],
      }));
      commit("SET_ROOMS", modifyRooms);
    },
    async getHistoryRoom({ commit }, roomName: string) {
      const messages = await getRoomHistory(roomName);
      commit("SET_HISTORY_ROOM", { roomName, messages });
    },
  }
);

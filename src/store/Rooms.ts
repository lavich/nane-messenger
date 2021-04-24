import { actionTree, getterTree, mutationTree } from "typed-vuex";
import { getRooms } from "@/api";
import { Room } from "@/types";

interface State {
  rooms: Room[];
}

export const state = (): State => ({
  rooms: [],
});

export const getters = getterTree(state, {});

export const mutations = mutationTree(state, {
  SET_ROOMS(state, rooms: Room[]) {
    state.rooms = rooms;
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
  }
);

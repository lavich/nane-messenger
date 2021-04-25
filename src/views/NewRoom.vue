<template>
  <div class="flex flex-col h-full">
    <h1 class="p-4 bg-gray-600 text-2xl font-semibold text-white">New Room</h1>
    <div
      class="flex-1 grid gap-2 overflow-y-auto items-center justify-center bg-gray-100"
    >
      <form>
        <label for="new-name" class="block">
          Придумайте название комнаты:
        </label>
        <input
          v-model="roomName"
          id="new-name"
          required
          :maxlength="maxLengthRoomTitle"
          class="p-2 rounded"
        />
      </form>
    </div>
    <InputForm @input="createRoom" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import InputForm from "@/components/InputForm.vue";
import { ClientMessage, Room } from "@/types";

export default Vue.extend({
  name: "NewRoom",
  components: { InputForm },
  data: () => ({
    roomName: "",
  }),
  watch: {
    "$accessor.Rooms.rooms"(rooms: Room[]) {
      const isNewRoomCreated = rooms.some(
        (room) => room.name === this.roomName
      );
      if (isNewRoomCreated) {
        this.$router.push("/chats/" + this.roomName);
      }
    },
  },
  computed: {
    maxLengthRoomTitle(): number {
      return this.$accessor.settings.max_room_title_length;
    },
  },
  methods: {
    createRoom(text: string) {
      if (!this.roomName) return;
      const data: ClientMessage = { room: this.roomName, text };
      this.$accessor.WS.sendMessage(data);
    },
  },
});
</script>

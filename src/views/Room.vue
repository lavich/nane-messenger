<template>
  <div v-if="room" class="flex flex-col h-full">
    <h1 class="p-4 bg-gray-600 text-2xl font-semibold text-white">
      {{ room.name }}
    </h1>

    <ul class="flex-1 grid gap-2 overflow-y-auto items-end p-2 bg-gray-100">
      <li v-for="(message, index) in room.messages" :key="index">
        <Message :message="message" />
      </li>
    </ul>

    <form class="flex p-2 bg-gray-600 space-x-2">
      <textarea rows="1" class="flex-1 w-full px-4 py-2 rounded-md" />
      <button class="rounded-md px-4 bg-white">Send</button>
    </form>
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import Vue from "vue";

import { Room } from "@/types";
import Message from "@/components/Message.vue";
import autosize from "autosize";

export default Vue.extend({
  name: "Room",
  components: { Message },
  computed: {
    room(): Room | undefined {
      const roomName = this.$route.params.id;
      return this.$accessor.Rooms.rooms.find((room) => room.name === roomName);
    },
  },
  watch: {
    async "$route.params.id"() {
      await this.loadMessageHistory();
    },
  },
  async mounted() {
    await this.loadMessageHistory();

    const textarea = document.querySelector("textarea");
    textarea && autosize(textarea);
  },
  methods: {
    async loadMessageHistory() {
      if (this.room && this.room.messages.length < 2) {
        const roomName = this.$route.params.id;
        await this.$accessor.Rooms.getHistoryRoom(roomName);
      }
    },
  },
});
</script>

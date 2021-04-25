<template>
  <div v-if="room" class="flex flex-col h-full">
    <h1 class="p-4 bg-gray-600 text-2xl font-semibold text-white">
      {{ room.name }}
    </h1>

    <div id="messages-board" class="flex-1 overflow-y-auto">
      <ul
        class="min-h-full flex flex-col justify-end items-start space-y-2 p-2 bg-gray-100"
      >
        <li
          v-for="(message, index) in room.messages"
          :key="index"
          class="w-full"
        >
          <Message :message="message" />
        </li>
      </ul>
    </div>

    <InputForm @input="sendMessage" />
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import Vue from "vue";

import { ClientMessage, Room } from "@/types";
import Message from "@/components/Message.vue";
import autosize from "autosize";
import InputForm from "@/components/InputForm.vue";

const scrollToBottom = (elem: string) => {
  const messagesBoard = document.getElementById(elem);
  if (messagesBoard) {
    messagesBoard.scrollTop = messagesBoard.scrollHeight;
  }
};

export default Vue.extend({
  name: "Room",
  components: { InputForm, Message },
  computed: {
    room(): Room | undefined {
      const roomName = this.$route.params.id;
      return this.$accessor.Rooms.rooms.find((room) => room.name === roomName);
    },
  },
  watch: {
    async "$route.params.id"() {
      await this.loadMessageHistory();
      scrollToBottom("messages-board");
    },
  },
  async mounted() {
    await this.loadMessageHistory();

    scrollToBottom("messages-board");
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
    sendMessage(text: string) {
      if (!this.room) return;
      const data: ClientMessage = { room: this.room.name, text };
      this.$accessor.WS.sendMessage(data);
    },
  },
});
</script>

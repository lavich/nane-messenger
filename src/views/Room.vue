<template>
  <div v-if="room" class="flex flex-col h-full">
    <h1 class="p-4 bg-gray-600 text-2xl font-semibold text-white">
      {{ room.name }}
    </h1>

    <div class="flex-1 overflow-y-auto">
      <ul
        class="min-h-full flex flex-col justify-end space-y-2 p-2 bg-gray-100"
      >
        <li v-for="(message, index) in room.messages" :key="index">
          <Message :message="message" />
        </li>
      </ul>
    </div>

    <InputForm />
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import Vue from "vue";

import { Room } from "@/types";
import Message from "@/components/Message.vue";
import autosize from "autosize";
import InputForm from "@/components/InputForm.vue";

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

<template>
  <router-link
    :to="roomLink"
    active-class="bg-blue-500 hover:bg-blue-500"
    class="block rounded-l-md p-2 flex gap-2 hover:bg-gray-500"
  >
    <span class="w-10 h-10 rounded-full bg-gray-100 grid place-content-center">
      <span class="text-gray-600">{{ avatarName }}</span>
    </span>
    <span class="flex-1 text-sm line-clamp-1">
      <span class="flex justify-between">
        <span class="text-sm line-clamp-1">{{ room.name }}</span>
        <span class="text-xs">{{ lastMessageDate }}</span>
      </span>
      <span class="text-xs line-clamp-1">
        <span class="text-blue-200">{{ lastMessage.sender.username }}:</span>
        {{ lastMessage.text }}
      </span>
    </span>
  </router-link>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Room, ServerMessage } from "@/types";

export default Vue.extend({
  name: "RoomCard",
  props: {
    room: {
      type: Object as PropType<Room>,
      required: true,
    },
  },
  computed: {
    roomLink(): string {
      return "/chats/" + this.room.name;
    },
    avatarName(): string {
      return this.room.name.slice(0, 2).toUpperCase();
    },
    lastMessage(): ServerMessage {
      return this.room.messages[this.room.messages.length - 1];
    },
    lastMessageDate(): string {
      return new Date(this.lastMessage.created).toLocaleDateString();
    },
  },
});
</script>

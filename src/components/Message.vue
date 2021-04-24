<template>
  <div class="bg-white block p-2 flex gap-2 rounded-md">
    <span class="w-10 h-10 rounded-full bg-gray-100 grid place-content-center">
      <span class="text-gray-600">{{ avatarName }}</span>
    </span>
    <div class="flex-1 text-sm">
      <div class="flex justify-between">
        <span class="text-sm text-blue-400 line-clamp-1">{{ userName }}</span>
        <span class="text-xs">{{ messageDate }}</span>
      </div>
      <div>{{ message.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ServerMessage } from "@/types";

export default Vue.extend({
  name: "Message",
  props: {
    message: {
      type: Object as PropType<ServerMessage>,
      required: true,
    },
  },
  computed: {
    userName(): string {
      return this.message.sender.username;
    },
    avatarName(): string {
      return this.userName.slice(0, 2).toUpperCase();
    },
    messageDate(): string {
      return (
        new Date(this.message.created).toLocaleTimeString(undefined, {
          hour12: false,
        }) +
        " " +
        new Date(this.message.created).toLocaleDateString()
      );
    },
  },
});
</script>

<template>
  <div class="bg-white block p-2 flex gap-2 rounded-md">
    <span class="w-10 h-10 rounded-full bg-gray-100 grid place-content-center">
      <span class="text-gray-600">{{ avatarName }}</span>
    </span>
    <div class="flex-1 text-sm">
      <span class="text-sm text-blue-400 line-clamp-1">{{ userName }}</span>
      <div>{{ message.text }}</div>
      <span class="pl-4 float-right text-xs text-gray-600">
        {{ messageDate }}
      </span>
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

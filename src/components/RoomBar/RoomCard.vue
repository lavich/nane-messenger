<template>
  <router-link :to="to" class="block p-2 flex gap-2 hover:bg-gray-500">
    <span class="w-10 h-10 rounded-full bg-gray-100 grid place-content-center">
      <span class="text-gray-600">AV</span>
    </span>
    <span class="flex-1">
      <span class="flex justify-between">
        <span>Name</span><span>Date</span>
      </span>
      <span>Message</span>
    </span>
  </router-link>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Route } from "vue-router";

export default Vue.extend({
  name: "RoomCard",
  props: {
    to: {
      type: [Object, String] as PropType<Route | string>,
      required: true,
    },
  },
});
</script>

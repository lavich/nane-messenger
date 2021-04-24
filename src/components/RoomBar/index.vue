<template>
  <nav class="h-full bg-gray-600 text-white">
    <ul>
      <li v-for="room in rooms" :key="room">
        <RoomCard :to="room" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

import RoomCard from "@/components/RoomBar/RoomCard.vue";

export default Vue.extend({
  name: "RoomBar",
  components: { RoomCard },
  data: () => ({
    rooms: ["d", "a"],
  }),
});
</script>

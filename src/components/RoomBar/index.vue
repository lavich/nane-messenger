<template>
  <div class="flex flex-col h-screen bg-gray-600 text-white">
    <AvatarCard :name="userName" />
    <nav class="overflow-y-auto pb-2">
      <ul class="pl-2 space-y-2">
        <li v-for="(room, index) in rooms" :key="index">
          <RoomCard :room="room" />
        </li>
        <li>
          <NewRoomCard />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import RoomCard from "@/components/RoomBar/RoomCard.vue";
import AvatarCard from "@/components/RoomBar/AvatarCard.vue";
import { Room } from "@/types";
import NewRoomCard from "@/components/RoomBar/NewRoomCard.vue";

export default Vue.extend({
  name: "RoomBar",
  components: { NewRoomCard, AvatarCard, RoomCard },
  data: () => ({
    // rooms: ["/chats/d", "/chats/a"],
  }),
  computed: {
    userName(): string {
      return this.$accessor.User.name;
    },
    rooms(): Room[] {
      return this.$accessor.Rooms.rooms;
    },
  },
});
</script>

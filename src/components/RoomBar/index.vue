<template>
  <div class="h-full bg-gray-600 text-white">
    <AvatarCard :name="userName" />
    <nav>
      <ul class="pl-2">
        <li v-for="(room, index) in rooms" :key="index" class="pt-2">
          <RoomCard :room="room" />
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

export default Vue.extend({
  name: "RoomBar",
  components: { AvatarCard, RoomCard },
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
  async created() {
    try {
      await this.$accessor.Rooms.getRooms();
    } catch (e) {
      // TODO
    }
  },
});
</script>

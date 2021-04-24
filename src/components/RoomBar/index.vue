<template>
  <div class="h-full bg-gray-600 text-white">
    <AvatarCard :name="userName" />
    <nav>
      <ul>
        <li v-for="room in rooms" :key="room">
          <RoomCard :to="room" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import RoomCard from "@/components/RoomBar/RoomCard.vue";
import AvatarCard from "@/components/RoomBar/AvatarCard.vue";

export default Vue.extend({
  name: "RoomBar",
  components: { AvatarCard, RoomCard },
  data: () => ({
    rooms: ["/chats/d", "/chats/a"],
  }),
  computed: {
    userName(): string {
      return this.$accessor.User.name;
    },
  },
});
</script>

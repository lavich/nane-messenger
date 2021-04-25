<template>
  <div class="grid grid-cols-12 h-screen">
    <aside class="col-span-3 border-r border-white border-solid">
      <RoomBar />
    </aside>

    <main class="col-span-9 h-screen flex flex-col">
      <router-view class="flex-1"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import RoomBar from "../components/RoomBar/index.vue";

export default Vue.extend({
  components: { RoomBar },
  mounted() {
    // const wsUrl = process.env.VUE_APP_WS_URL;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$connect("wss://nane.tada.team/ws" + "?username={username}");
    } catch (e) {
      console.log({ e });
    }
  },
});
</script>

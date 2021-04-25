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
});
</script>

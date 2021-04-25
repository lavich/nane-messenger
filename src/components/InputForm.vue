<template>
  <form class="flex items-start p-2 bg-gray-600 space-x-2">
    <textarea rows="1" class="flex-1 w-full px-4 py-2 rounded-md" />
    <button class="rounded-md px-4 h-10 bg-white">Send</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "InputForm",
});
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="p-4 bg-gray-600 text-2xl font-semibold text-white">New Room</h1>
    <div
      class="flex-1 grid gap-2 overflow-y-auto items-center justify-center bg-gray-100"
    >
      Create New Room
    </div>
    <InputForm :room-name="''" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import autosize from "autosize";
import InputForm from "@/components/InputForm.vue";

export default Vue.extend({
  name: "NewRoom",
  components: { InputForm },
  computed: {},

  async mounted() {
    const textarea = document.querySelector("textarea");
    textarea && autosize(textarea);
  },
  methods: {},
});
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="flex items-start p-2 bg-gray-600 space-x-2"
  >
    <label class="flex-1">
      <textarea
        v-model="message"
        rows="1"
        required
        :disabled="disabled"
        :maxlength="maxMessageLength"
        class="w-full px-4 py-2 rounded-md"
        @keyup.ctrl.enter="onSubmit"
      />
    </label>
    <button
      :disabled="disabled"
      type="submit"
      class="rounded-md px-4 h-10 bg-white"
    >
      Send
    </button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "InputForm",
  data: () => ({
    message: "",
  }),
  computed: {
    maxMessageLength(): number {
      return this.$accessor.settings.max_message_length;
    },
    disabled() {
      return !this.$accessor.WS.socket.isConnected;
    },
  },
  methods: {
    onSubmit() {
      this.$emit("input", this.message);
      this.message = "";
    },
  },
});
</script>

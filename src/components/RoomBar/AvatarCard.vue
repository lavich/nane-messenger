<template>
  <div class="block p-2 flex gap-2">
    <span
      class="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 grid place-content-center"
    >
      <span class="text-gray-600">{{ avatarName }}</span>
    </span>
    <span class="flex-1 grid place-content-center">
      <label v-if="isEditName" class="text-black">
        <input :value="name" @change="updateName" @blur="updateName" />
      </label>
      <button v-else @click="isEditName = true">{{ name }}</button>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AvatarCard",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    isEditName: false,
  }),
  computed: {
    avatarName(): string {
      return this.name.slice(0, 2).toUpperCase();
    },
  },
  methods: {
    updateName({ target }: { target: HTMLInputElement }) {
      this.$accessor.User.setName(target.value);
      this.isEditName = false;
    },
  },
});
</script>

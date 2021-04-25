<template>
  <div class="p-2 flex items-center gap-2">
    <img
      src="../../assets/roma.png"
      alt="roma avatar"
      class="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 grid place-content-center"
    />
    <span class="flex-1 line-clamp-1">
      {{ name }}
    </span>
    <router-link to="/logout" title="logout">🚪</router-link>
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

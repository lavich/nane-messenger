<template>
  <main class="h-screen w-screen flex justify-center items-center bg-gray-200">
    <div class="p-4 bg-gray-600 rounded shadow">
      <h1 class="text-2xl text-white mb-2 text-center">Регистрация</h1>
      <form @submit.prevent="onSubmit" class="flex flex-col">
        <label for="name" class="text-white"> Имя </label>
        <input
          v-model="userName"
          id="name"
          required
          :maxlength="maxLengthName"
          class="p-2 rounded-sm"
        />
        <button type="submit" class="mt-4 py-2 bg-blue-200 rounded">
          Войти
        </button>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Login",
  data: () => ({
    userName: "",
  }),
  computed: {
    maxLengthName(): number {
      return this.$accessor.settings.max_username_length;
    },
  },
  methods: {
    async onSubmit() {
      this.$accessor.User.setName(this.userName);
      try {
        await this.$accessor.Rooms.getRooms();
      } catch (e) {
        console.log({ e });
      }

      const firstRoom = this.$accessor.Rooms.rooms.find(Boolean);
      const link = firstRoom ? "/chats/" + firstRoom.name : "/";
      this.$router.push(link);
    },
  },
});
</script>

<style scoped>
input:invalid:focus {
  @apply bg-red-200;
}
</style>

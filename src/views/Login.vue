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
      <div v-if="error" class="text-red-600">Не удалось подключится</div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Login",
  data: () => ({
    userName: "",
    error: false,
  }),
  computed: {
    maxLengthName(): number {
      return this.$accessor.settings.max_username_length;
    },
  },
  watch: {
    userName() {
      this.error = false;
    },
  },
  methods: {
    async onSubmit() {
      this.error = false;
      try {
        this.$accessor.login(this.userName);
        await this.$accessor.Rooms.getRooms();
        const firstRoom = this.$accessor.Rooms.rooms.find(Boolean);
        const link = firstRoom ? "/chats/" + firstRoom.name : "/";
        await this.$router.push(link);
      } catch (e) {
        this.error = true;
      }
    },
  },
});
</script>

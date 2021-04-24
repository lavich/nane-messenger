<template>
  <div id="app">
    <div v-if="error">{{ error }}</div>
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    error: "",
  }),
  async beforeMount() {
    try {
      await this.$accessor.getSettings();
    } catch (e) {
      this.error = "Нет связи с сервером или не настроены переменные окружения";
    }
  },
});
</script>

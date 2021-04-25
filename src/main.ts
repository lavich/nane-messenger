import Vue from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueNativeSock from "vue-native-websocket";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/index.css";

// const wsUrl = process.env.VUE_APP_WS_URL;
Vue.use(VueNativeSock, "wss://nane.tada.team/ws" + "?username={username}", {
  store,
  format: "json",
  connectManually: true,
  passToStoreHandler: function (eventName: string, event: any) {
    if (!eventName.startsWith("SOCKET_")) {
      return;
    }
    let method = "commit";
    let target = eventName.toUpperCase();
    let msg = event;
    if (this.format === "json" && event.data) {
      msg = JSON.parse(event.data);
      if (msg.mutation) {
        target = [msg.namespace || "", msg.mutation]
          .filter((e) => !!e)
          .join("/");
      } else if (msg.action) {
        method = "dispatch";
        target = [msg.namespace || "", msg.action].filter((e) => !!e).join("/");
      }
    }

    target = "WS/" + target;
    this.store[method](target, msg);
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";

import vuetify from "@/plugins/vuetify"; // path to vuetify export
import apolloProvider from "@/plugins/apollo";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch("getCurrentUser");
  }
}).$mount("#app");

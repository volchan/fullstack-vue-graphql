import Vue from "vue";

import vuetify from "@/plugins/vuetify"; // path to vuetify export
import apolloProvider from "@/plugins/apollo";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import FormAlert from "./components/shared/FormAlert.vue";

Vue.component("form-alert", FormAlert);

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

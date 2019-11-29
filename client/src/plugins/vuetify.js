import Vue from "vue";
import Vuetify from "vuetify/lib";

import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

const opts = {
  iconfont: "mdi",
  theme: {
    themes: {
      light: {
        primary: "#4A56A3",
        secondary: "#5F6ED1",
        accent: "#7386FF",
        error: "#f44336",
        warning: "#ff9800",
        info: "#03a9f4",
        success: "#4caf50"
      }
    }
  }
};

export default new Vuetify(opts);

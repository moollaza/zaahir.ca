import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import "./main.css";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

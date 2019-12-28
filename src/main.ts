// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development") {
  Vue.config.performance = true;
  console.log("Vue performance enabled");
}

/* eslint-disable no-new */
new Vue({
  router,
  render: x => x(App)
}).$mount("#app");

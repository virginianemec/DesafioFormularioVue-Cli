import Vue from "vue";

import VueForm from "vue-form";
import VueRouter from "vue-router";
import VueSimpleAlert from "vue-simple-alert";

import router from "./router/router";

import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";

import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.use(VueForm);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;

Vue.filter("categoryFilter", (value) => {
  console.log("en el mail");
  if (!value) return "Sin categoria";
  return value.toString().toUpperCase();
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import VueForm from "vue-form";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
Vue.use(VueForm);

Vue.filter("categoryFilter", (value) => {
  console.log("en el mail");
  if (!value) return "Sin categoria";
  return value.toString().toUpperCase();
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");

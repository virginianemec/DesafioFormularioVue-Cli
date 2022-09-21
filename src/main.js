import Vue from "vue";
import App from "./App.vue";
import VueForm from "vue-form";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
Vue.use(VueForm);
Vue.config.productionTip = false;

Vue.filter("categoryFilter", (value) => {
  console.log("en el mail");
  if (!value) return "Sin categoria";
  return value.toString().toUpperCase();
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");

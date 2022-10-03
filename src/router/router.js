import Vue from "vue";
import VueRouter from "vue-router";

import IndexView from "../views/IndexView";
import ProductsView from "../views/ProductsView.vue";

Vue.use(VueRouter);

// const router = new VueRouter({routes, mode: 'history'});
export default new VueRouter({
  // generar historial de navegación
  mode: "history",
  // Ruta gral del endpoint
  base: process.env.BASE_URL,
  // array que contendrá las vistas de ruteo
  routes: [
    {
      // la ruta base,
      path: "/",
      // el nombre de dicha ruta
      name: "Index",
      // y el componente asociado a la misma, el cual proviene de la vista relacionada
      // importados arriba.
      component: IndexView,
    },
    {
      path: "/",
      name: "Productos",
      component: ProductsView,
    },
  ],
});

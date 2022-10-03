import Vue from "vue";
import Vuex from "vuex";

import products from "./products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workDescription: "",
  },

  getters: {
    getWorkDescription(state) {
      return state.workDescription;
    },
  },

  mutations: {
    setWorkDescription(state, message) {
      state.workDescription = message;
    },
  },

  actions: {
    cambiarWorkDescription({ commit }, message) {
      commit("setWorkDescription", message);
    },
  },
  modules: {
    products,
  },
});

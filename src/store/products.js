/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const URL = "https://632ba1f21aabd8373989647d.mockapi.io/productos/";
import axios from "axios";

export default {
  namespace: true,
  state: {
    products: [],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getProductLength(state) {
      return state.products.length;
    },
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
  },

  actions: {
    async productsFromApi({ commit }) {
      await axios
        .get(URL)
        .then(async (response) => {
          console.table(response.data);
          await commit("setProducts", response.data);
        })
        .catch((err) => {
          console.error("error", err);
        })
        .finally(() =>
          console.log("Peticion terminada - action productsFromApi.")
        );
    },
    async productSave({ commit }, objToSave) {
      const data = {
        name: objToSave.name,
        price: objToSave.price,
        activo: objToSave.activo,
        category: objToSave.category,
      };
      await axios
        .post(URL, data)
        .then((response) => {
          console.table(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async productsReset({ commit, state }) {
      state.products.forEach(async (element) => {
        const valId = element.id;
        await axios
          .delete(`${URL}${valId}`)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            alert(err);
          })
          .finally(() =>
            console.log("Peticion terminada - volver a traer los datos.")
          );
      });
    },
    async productUpdate({ commit, state, context }, product) {
      const data = {
        name: product.name,
        price: product.price,
        activo: product.activo,
        category: product.category,
        image: product.image,
        id: product.id,
        id_producto: product.id_producto,
        cant: product.cant,
      };
      const valId = data.id_producto;
      const header = {
        "Content-Type": "application/json",
      };
      await axios
        .put(URL + valId, data)
        .then(async (response) => {
          console.log(response);
        })
        .catch((err) => {
          alert(err);
        })
        .finally(console.log("Peticion terminada - volver a traer los datos."));
    },
    async productDelete({ commit, state, context }, valId) {
      await axios
        .delete(URL + valId)
        .then(async (response) => {
          console.log(response);
        })
        .catch((err) => {
          alert("No se pudo borrar el producto. " + err);
        })
        .finally(() =>
          console.log("Peticion terminada - volver a traer los datos.")
        );
    },

    /*
    deleteTodo(id){
        axios.delete(`url/todos/${id}`)
        .then(res => this.todos = this.todos.filter(todo => todo.id !== id))
        .catch(err => console.log(err));
        //this.todos = this.todos.filter(todo => todo.id !== id);
    }   
      // si el metodo estuviene sen otro modulo: dispatch("movement/goForward", speed, { root: true });
    */
  },
};

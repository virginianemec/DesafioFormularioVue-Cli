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
    /* async fetchProducts() {
			carrito.forEach(async (element) => {
			await axios.get("url/id")
			.then((response) => {
					if (element.price > 1000	) {
						await commit("SET_PRODUCTS", response.data)
					}
				});
			})
			.catch((err) => {
				alert(err)
			})
			//.finally(() => console.log("Peticion terminada"))
		}, */
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
    //  .delete(`${this.urlCarrito}/${idProducto}`)
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
    // .put(`${this.urlCarrito}/${idCarrito}`, val)
    async productUpdate({ commit, state }, product) {
      const data = product;
      const valId = product.id;
      await axios
        // .put(`${URL}${valId}`, product)
        .put(URL, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() =>
          console.log("Peticion terminada - volver a traer los datos.")
        );
    },
    async productDelete({ commit, state }, valId) {
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
    },
  },
};

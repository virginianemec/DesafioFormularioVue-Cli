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
    async productUpdate({ commit, state, context }, product) {
      const data = {
        name: product.name,
        price: product.price,
        activo: product.activo,
        category: product.category,
        image: product.image,
        stock: 0,
        id: product.id,
        id_product: product.id_product,
        cant: product.cant,
      };
      const valId = product.id;
      await axios
        .put(
          `https://632ba1f21aabd8373989647d.mockapi.io/productos/${encodeURIComponent(
            valId
          )}`,
          data
        )
        .then(async (response) => {
          console.log(response);
          await context.dispatch("productsFromApi");
        })
        .catch((err) => {
          alert(err);
        })
        .finally(console.log("Peticion terminada - volver a traer los datos."));
    },
    async productDelete({ commit, state, context }, valId) {
      await axios
        .delete(
          "https://632ba1f21aabd8373989647d.mockapi.io/productos/" + valId
        )
        .then(async (response) => {
          console.log(response);
          // si el metodo estuviene sen otro modulo: dispatch("movement/goForward", speed, { root: true });
        })
        .catch((err) => {
          alert("No se pudo borrar el producto. " + err);
        })
        .finally(
          () => console.log("Peticion terminada - volver a traer los datos."),
          await context.dispatch("productsFromApi")
        );
    },
  },
};

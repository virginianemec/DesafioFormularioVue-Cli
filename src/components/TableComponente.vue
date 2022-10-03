<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div>
    <div v-if="isAnyProduct">
      <div class="div--container">
        <div class="titleTable">LISTADO DE PRODUCTOS</div>

        <table class="table">
          <thead>
            <tr class="table--tr">
              <th>ID</th>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>CATEGORIA</th>
              <th>A LA VENTA?</th>
            </tr>
          </thead>

          <tbody v-for="(product, i) in products" :key="i">
            <tr>
              <td class="table--td">{{ product.id }}</td>
              <td class="table--td">
                {{ product.name | nameFilter(product.name) }}
              </td>
              <td class="table--td">
                {{ product.price | priceFilter(product.price) }}
              </td>
              <td class="table--td">{{ product.category | categoryFilter }}</td>
              <td class="table--td">
                {{ product.activo | isActivo(product.activo) }}
              </td>
              <td>
                <button v-on:click="productUpdate(product)">Update</button>
              </td>
              <td>
                <button v-on:click="productDelete(product)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>" ---- NO HAY PRODUCTOS PARA MOSTRAR ------ "</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TableComponente",
  /*props: {
    products: {},
  },*/
  filters: {
    nameFilter(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
    priceFilter(value) {
      if (!value) return "$ No asignado.";
      return `$ ${value}`;
    },
    isActivo(value) {
      return value === 1 ? "SI" : "NO";
    },
  },
  methods: {
    async reset() {
      // metodo para vaciar el listado.
      await this.$store.dispatch("productsReset");
    },
    productUpdate(prod) {
      console.log(prod.id + " " + prod.id_producto);
      this.$emit("productController", { function: "update", product: prod });
    },
    productDelete(prod) {
      console.log(prod.id + " " + prod.id_producto);
      this.$emit("productController", { function: "delete", product: prod });
    },
  },
  computed: {
    ...mapGetters("products", ["getProducts", "getProductLength"]),
    products() {
      return this.$store.getters.getProducts;
    },
    isAnyProduct() {
      return this.$store.getters.getProductLength > 0;
    },
  },
};
</script>

<style scoped>
.div--container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
  padding-top: 20px;
}
table {
  width: 90%;
  margin: auto;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgb(142, 142, 142);
  transition: 0.3s;
  color: #2c3e50;
  text-align: left;
  background-color: aliceblue;
}
.titleTable {
  background-color: #555555;
  color: white;
  text-align: center;
  font-size: 15px;
  padding: 10px;
  width: 90%;
}

th {
  text-align: left;
  font-size: 16px;
  padding-left: 10px;
}
.table--tr {
  color: #555555;
  text-align: center;
  font-size: 2.1rem;
}
.table--td {
  padding-top: 10px;
  color: #555555;
  text-align: left;
  font-size: 16px;
}
</style>

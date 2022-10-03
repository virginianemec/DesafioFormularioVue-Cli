<template>
  <div>
    <div class="descripcion" v-html="description"></div>
    <FormComponent></FormComponent>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormComponent from "@/components/FormComponent.vue";

export default {
  components: {
    FormComponent,
  },
  data() {
    return {
      // products: this.$store.getters.getProducts,
      // url: "https://632ba1f21aabd8373989647d.mockapi.io/productos/",
    };
  },
  mounted() {
    this.getProductos();
    this.$store.dispatch(
      "cambiarWorkDescription",
      `Cargue los valores del formulario.  Presione el botón Nuevo, o bien la
    tecla Enter, para guardar el producto. Si los datos no son correctos, el sistema le avisará.`
    );
  },
  computed: {
    ...mapGetters(["getWorkDescription"]),
    description() {
      return this.$store.getters.getWorkDescription;
    },
  },
  methods: {
    // obtener los productos from api, desde el store.
    //cuando inicio la app.
    async getProductos() {
      await this.$store.dispatch("productsFromApi");
    },

    /* async itemAddFromForm(objProduct) {
      const id = this.products.length + 1;
      objProduct.id = id;
      objProduct.id_producto = id;
      await this.productSave(objProduct)
        .then((resp) => {
          console.log(resp);
          this.$alert("Se ha creado el producto.", "Atención", "success");
          // this.getProductos(); por que ahora es reactivo al store.
        })
        .catch((err) => {
          this.$alert(`No pudo crearse el producto. Intente de nuevo. ${err}`);
        });
      console.log("producto.add");
    },*/

    /*  async productSave(objProduct) {
      return this.$store.dispatch("productAdd", objProduct);

     await this.axios
        .post(this.url, producto)
        .then((response) => {
          console.table(response.data);
          this.products = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /*
      async callAxios(str) {
      try {
        const url = "http://asd.com”;
        let response = await axios.get(url, {timeout: 10000});
        this.results = response.data;
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    */
  },
};
</script>

<style scoped>
.descripcion {
  background-color: #e5f876;
  color: black;
  padding: 10px;
}
</style>

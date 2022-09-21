<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <HeaderComponent
      :title="this.title"
      :presentation_name="this.presentation_name"
      :workDescription="this.workDescription"
    ></HeaderComponent>
    <FormComponent
      @itemAdd="itemAddFromForm($event)"
      :products="this.products"
    ></FormComponent>
    <TableComponente :products="this.products"></TableComponente>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import TableComponente from "./components/TableComponente.vue";
import FormComponent from "./components/FormComponent.vue";

export default {
  name: "App",
  data() {
    return {
      products: [],
      title: "Hello Coderhouse!",
      presentation_name: `PROYECTO VUE CLI CON FORMULARIO <br>
      Instancia un formulario Vue/Cli con validaciones. `,
      workDescription: `Cargue los valores del formulario. Presione el botón Nuevo, o bien la
      tecla Enter, para guardar el producto. Si los datos no son correctos, el sistema le avisará.`,
    };
  },
  components: {
    HeaderComponent,
    FooterComponent,
    TableComponente,
    FormComponent,
  },
  methods: {
    itemAddFromForm(objProduct) {
      objProduct.id = this.products.length + 1;
      this.products.push(objProduct);
      console.log("add item");
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightgoldenrodyellow;
}
</style>

<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <HeaderComponent
      :title="this.title"
      :presentation_name="this.presentation_name"
    ></HeaderComponent>
    <router-view></router-view>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  data() {
    return {
      title: "Hello Coderhouse!",
      presentation_name: `PROYECTO VUE CLI CON FORMULARIO <br>
      Instancia un formulario Vue/Cli con validaciones. `,
    };
  },
  components: {
    HeaderComponent,
    FooterComponent,
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

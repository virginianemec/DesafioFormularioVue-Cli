<template>
  <div>
    <span>ENTREGA 5</span>
    <div class="descripcion" v-html="description"></div>
    <br />
    <div style="text-align: center">
      <router-link :to="{ name: 'Productos' }">ABM Productos</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch(
      "cambiarWorkDescription",
      "DESAFÍO DE VUE CDN A VUE CLI <br> Convierte tu desafío de la Clase 04 de Vue CDN a Vue Cli."
    );
  },
  computed: {
    ...mapGetters(["getWorkDescription"]),
    description() {
      return this.$store.getters.getWorkDescription;
    },
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

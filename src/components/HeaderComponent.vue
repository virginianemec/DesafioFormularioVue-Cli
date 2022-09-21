<template>
  <div class="coder--header">
    <h1>{{ title }} - {{ presentation_name }}</h1>
    <div class="descripcion" v-html="workDescription"></div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    title: String,
    presentation_name: String,
    workDescription: String,
  },
};
</script>

<style scoped>
.coder--header {
  background-color: #393b43;
  color: white;
}
h1 {
  color: #e5f876;
  font-size: 25px;
  padding: 10px;
}
.descripcion {
  background-color: #e5f876;
  color: black;
  padding: 10px;
}
</style>

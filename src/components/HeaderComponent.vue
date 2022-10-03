<template>
  <div class="coder--header">
    <h1>
      <div v-html="title"></div>
      <div v-html="presentation_name"></div>
    </h1>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    title: String,
    presentation_name: String,
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
  font-size: 15px;
  padding: 10px;
}
</style>

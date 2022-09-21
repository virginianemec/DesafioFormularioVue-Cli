<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div class="div--container">
    <table class="table">
      <thead>
        <tr class="table--tr">
          <th>ID</th>
          <th>NAME</th>
          <th>PRICE</th>
          <th>CATEGORY</th>
          <th>A LA VENTA?</th>
        </tr>
      </thead>
      <tbody v-for="product in products" :key="product.id">
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableComponente",
  props: {
    products: {},
  },
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
};
</script>

<style scoped>
.div--container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
  padding: 20px;
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
}
.titleTable {
  background-color: #babcc2;
  /* color: white;*/
  text-align: center;
  font-size: 15px;
  padding-top: 10px;
}
/*table:hover {
  transform: scale(1.05);
}*/
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

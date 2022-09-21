<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <HeaderComponent
      :title="this.title"
      :presentation_name="this.presentation_name"
      :workDescription="this.workDescription"
    ></HeaderComponent>
    <!-- <FormComponent
      :products="products"
      @itemAdd="itemAddFromForm($event)"
      @itemDelete="itemDeleteFromForm($event)"
      @itemEdit="itemEditFromForm($event)"
    ></FormComponent>-->
    <div class="div--container">
      <vue-form
        :state="formStateProducts"
        @submit.prevent="productAdd()"
        name="resgiterProduct"
        class="formulario"
      >
        <div>
          <p>iD* - Se creará automaticamente.</p>
          <validate tag="label" :custom="{ customValidator: customValidator }">
            <p>Nombre*</p>
            <input v-model.trim="product.name" type="text" required name="name" />
            <field-messages name="name">
              <div>Ok.</div>
              <div slot="required">Ingrese un nombre por favor.</div>
              <div slot="customValidator">El nombre debe ser unico. Intente otro.</div>
            </field-messages>
          </validate>

          <validate tag="label" :custom="{ priceValidator: priceValidator }">
            <p>Precio *</p>
            <input
              v-model.number="product.price"
              type="number"
              required
              name="price"
              min="1"
              max="9999"
            />
            <field-messages name="price">
              <div>Ok.</div>
              <div slot="required">Ingrese un precio por favor.</div>
              <div slot="priceValidator">El precio debe ser mayor a 0 (cero).</div>
              <div slot="min">El valor debe ser numerico mayor a cero.</div>
              <div slot="max">El valor debe ser numerico menor a 9999.</div>
            </field-messages>
          </validate>
        </div>
        <div>
          <validate tag="label" :custom="{ categoryValidator: categoryValidator }">
            <p>Categoria*</p>
            <select id="category" v-model="product.category" name="category" required>
              <option value="Comida rápida">Comida rápida</option>
              <option value="Comida vegana">Comida vegana</option>
              <option value="Comida sin TACC">Comida sin TACC</option>
            </select>

            <field-messages name="category">
              <div>Ok.</div>
              <div slot="required">Seleccione una categoria</div>
              <div slot="categoryValidator">La comida sin TACC no debe costar mas de $1500</div>
            </field-messages>
          </validate>
          <validate tag="label" :custom="{ activoValidator: activoValidator }">
            <p>¿Disponible para la venta?</p>
            <input type="radio" id="si" value="1" v-model="product.activo" />
            <label for="si">SI</label>
            <br />
            <input type="radio" id="no" value="2" v-model="product.activo" />
            <label for="no">No</label>
            <br />
            <field-messages name="category">
              <div>Ok.</div>
              <div slot="required">Seleccione una categoria</div>
              <div slot="activoValidator">La comida sin TACC no debe costar mas de $1500</div>
            </field-messages>
          </validate>
        </div>
        <div>
          <button type="submit" class="btn btn-primary" @keyup.enter="submit">Nuevo</button>
        </div>
      </vue-form>
    </div>
    <!-- <TableComponent
      :products="products"
      @itemDelete="itemDeleteFromTable($event)"
      @itemEdit="itemEditFromFormTable($event)"
    ></TableComponent>
    -->
    <div class="titleTable">LISTADO DE PRODUCTOS</div>
    <div>
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
            <td class="table--td">{{ product.name | nameFilter(product.name) }}</td>
            <td class="table--td">{{ product.price | priceFilter(product.price) }}</td>
            <td class="table--td">{{ product.category | categoryFilter }}</td>
            <td class="table--td">{{ product.activo | isActivo(product.activo) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
//import FormComponent from "./components/FormComponent.vue";

export default {
  name: "App",
  data() {
    return {
      formStateProducts: {},
      products: [],
      title: "Hello Coderhouse!",
      presentation_name: "Mi nombre es Virginia Nemec",
      workDescription: `PROYECTO VUE CLI CON FORMULARIO <br>
      Instancia un formulario Vue/Cli con validaciones. `,
      product: {
        id: "",
        name: "",
        price: "",
        stock: "",
        category: "",
        activo: 1,
      },
    };
  },
  components: {
    HeaderComponent,
    FooterComponent,
    //FormComponent,
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
  methods: {
    itemAddFromForm() {
      this.product.id = this.products.length + 1;
      const obj = Object.assign({}, this.product);
      this.products.push(obj);
      this.resetProduct();
      console.log("add item");
    },
    itemDeleteFromForm(data) {
      const indexOfObject = this.products.findIndex(
        (object) => object.id === data.id
      );

      this.products.splice(indexOfObject, 1);

      console.log("itemdelete");
    },
    itemEditFromForm() {
      const indexOfObject = this.products.findIndex(
        (object) => object.id === this.product.id
      );
      this.products[indexOfObject].name = this.product.name;
      this.products[indexOfObject].category = this.product.category;
      this.products[indexOfObject].price = this.product.price;
      this.products[indexOfObject].activo = this.product.activo;

      console.log("hola");
    },
    resetProduct() {
      this.product = {
        id: "",
        name: "",
        price: "",
        stock: "",
        category: "",
        activo: 1,
      };
    },
    productAdd() {
      if (this.formStateProducts.$invalid) {
        alert("Los datos no son correctos. Verifiquelos por favor.");
        return;
      }
      alert("Guardamos el item");
      this.itemAddFromForm();
    },
    productDelete() {
      /*if (this.formStateProducts.$invalid) {
        alert("Los datos no son correctos. Verifiquelos por favor.");
        return;
      }*/
      // Seguro quiere borrar el item?
      alert("Borramos el item");
      this.itemDeleteFromForm();
    },
    productEdit() {
      if (this.formStateProducts.$invalid) {
        alert("Los datos no son correctos. Verifiquelos por favor.");
        return;
      }
      // Seguro quiere borrar el item?
      alert("Modificamos el item");
      this.itemEditFromForm();
    },

    customValidator: function () {
      return this.productExists() ? false : true;
    },
    activoValidator() {
      return this.product.activo ? true : false;
    },
    /* productNameValidator() {
      let respuesta = false;

      if (this.product.stock >= 18) {
        respuesta = true;
      }
      return respuesta;
    },*/
    priceValidator() {
      return true;
    },
    productExists() {
      let respuesta = false;
      let prodExists = this.products.find(
        (prod) => prod.name == this.product.name
      );
      if (prodExists) {
        respuesta = true;
      }
      return respuesta;
    },
    categoryValidator() {
      let respuesta = true;
      if (this.product.category === "Comida sin TACC") {
        if (this.product.price > 1500) {
          //si es sin tacc debiera valer menos de 1500.
          respuesta = false;
        }
      }
      return respuesta;
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
}
p {
  text-align: left;
}
.formulario {
  border: 1px solid #000;
  display: flex;
  flex-flow: row;
  width: 80%;
  margin: auto;
  padding: 25px;
  /* border-radius: 15px; */
  box-shadow: 2px 2px 10px rgb(142, 142, 142);
  transition: 0.3s;
  color: #2c3e50;
  text-align: center;
  justify-content: space-around;
}

.titleTable {
  background-color: #babcc2;
  /* color: white;*/
  text-align: center;
  font-size: 15px;
  padding-top: 10px;
}
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

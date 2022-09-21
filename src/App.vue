<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <HeaderComponent
      :title="this.title"
      :presentation_name="this.presentation_name"
      :workDescription="this.workDescription"
    ></HeaderComponent>
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
              <div slot="priceValidator">La comida sin TACC no debe costar mas de $1500</div>
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
    <TableComponente :products="this.products"></TableComponente>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import TableComponente from "./components/TableComponente.vue";

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
    TableComponente,
  },
  methods: {
    itemAddFromForm() {
      this.product.id = this.products.length + 1;
      const obj = Object.assign({}, this.product);
      this.products.push(obj);
      this.resetProduct();
      console.log("add item");
    },
    productAdd() {
      if (this.formStateProducts.$invalid) {
        alert("Los datos no son correctos. Verifiquelos por favor.");
        return;
      }
      alert("Guardamos el item");
      this.itemAddFromForm();
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
    customValidator: function () {
      return this.productExists() ? false : true;
    },
    activoValidator() {
      return this.product.activo ? true : false;
    },
    priceValidator() {
      let respuesta = true;
      if (this.product.category === "Comida sin TACC") {
        if (this.product.price > 1500) {
          //si es sin tacc debiera valer menos de 1500.
          respuesta = false;
        }
      }
      return respuesta;
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
.div--container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
  padding: 20px;
}
</style>

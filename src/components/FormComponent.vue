<!-- eslint-disable prettier/prettier -->
<template>
  <div class="principal">
    <vue-form
      :state="formStateProducts"
      @submit.prevent="productAdd()"
      name="resgiterProduct"
      class="form"
    >
      <validate tag="label" :custom="{ customValidator: customValidator }">
        <div class="renglon">
          <p>Nombre*:</p>
          <input v-model.trim="product.name" type="text" required name="name" />
          <field-messages class="etiqueta" name="name">
            <div>Ok.</div>
            <div slot="required">Ingrese un nombre por favor.</div>
            <div slot="customValidator">
              El nombre debe ser unico. Intente otro.
            </div>
          </field-messages>
        </div>
      </validate>

      <validate tag="label" :custom="{ priceValidator: priceValidator }">
        <div class="renglon">
          <p>Precio*:</p>
          <input
            v-model.number="product.price"
            type="number"
            required
            name="price"
            min="1"
            max="9999"
          />

          <field-messages class="etiqueta" name="price">
            <div>Ok.</div>
            <div slot="required">Ingrese un precio por favor.</div>
            <div slot="priceValidator">
              La comida sin TACC no debe costar mas de $1500
            </div>
            <div slot="min">El valor debe ser numerico mayor a cero.</div>
            <div slot="max">El valor debe ser numerico menor a 9999.</div>
          </field-messages>
        </div>
      </validate>

      <validate tag="label" :custom="{ categoryValidator: categoryValidator }">
        <div class="renglon">
          <p>Categoria*:</p>
          <select
            id="category"
            v-model="product.category"
            name="category"
            required
          >
            <option value="Comida rápida">Comida rápida</option>
            <option value="Comida vegana">Comida vegana</option>
            <option value="Comida sin TACC">Comida sin TACC</option>
          </select>
          <field-messages class="etiqueta" name="category">
            <div>Ok.</div>
            <div slot="required">Seleccione una categoria</div>
            <div slot="categoryValidator">
              La comida sin TACC no debe costar mas de $1500
            </div>
          </field-messages>
        </div>
      </validate>
      <validate tag="label" :custom="{ activoValidator: activoValidator }">
        <p>¿Disponible para la venta?</p>
        <div class="renglon">
          <input
            id="si"
            name="activo"
            value="1"
            checked="checked"
            type="radio"
            v-model="product.activo"
          />
          <label for="si"> <span></span> Si </label>

          <input
            id="no"
            name="activo"
            value="2"
            type="radio"
            v-model="product.activo"
          />
          <label for="no"> <span></span> No </label>
          <field-messages class="etiqueta" name="activo">
            <div>Ok.</div>
            <div slot="required">Seleccione una categoria</div>
            <div slot="activoValidator">
              La comida sin TACC no debe costar mas de $1500
            </div>
          </field-messages>
        </div>
      </validate>
      <div>
        <button type="submit" class="btn btn-primary" @keyup.enter="submit">
          Nuevo
        </button>
      </div>
    </vue-form>
  </div>
</template>

<script>
export default {
  name: "FormComponent",
  props: {
    products: [],
  },
  data() {
    return {
      formStateProducts: {},
      product: {
        id: "",
        name: "",
        price: "",
        category: "",
        activo: 1,
      },
    };
  },
  methods: {
    productAdd() {
      if (this.formStateProducts.$invalid) {
        alert("Los datos no son correctos. Verifiquelos por favor.");
        return;
      }
      alert("Guardamos el item");
      const obj = Object.assign({}, this.product);
      this.resetProduct();
      this.$emit("itemAdd", obj);
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
      return respuesta;
    },

    inputToUpperCase(value) {
      value = value.toString();
      return value.toUpperCase();
    },
    productExists() {
      let respuesta = false;

      let prodExists = this.products.find((prod) => {
        prod.name.toUpperCase() === this.product.name;
      });
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
label,
p {
  display: block;
  /*margin-top: 20px;*/
  letter-spacing: 1px;
}

.etiqueta {
  display: block;
  letter-spacing: 1px;
  color: red;
}

.principal {
  display: flex;
  margin: 0 auto;
  color: #666666;
  padding-top: 2%;
  padding-left: 20%;
  font-family: Arial;
  text-align: left;
  /*border: 3px solid #00b100;*/
  border-radius: 15px;
  width: 80%;
  box-shadow: 2px 2px 10px rgb(142, 142, 142);
  background-color: #fff;
}
.renglon {
  display: flex !important;
  flex-direction: row;
  align-items: baseline;
  flex-wrap: nowrap;
}

button {
  width: 85px;
  height: 35px;
  border: none;
  margin-top: 20px;
  padding-bottom: 20px;
  cursor: pointer;
}

input[type="radio"] {
  display: none;
}
input[type="radio"] + label {
  font-weight: 400;
  font-size: 14px;
}
input[type="radio"] + label span {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: -2px 10px 0 0;
  vertical-align: middle;
  cursor: pointer;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 3px solid #ffffff;
}
input[type="radio"] + label span {
  background-color: #fff;
}
input[type="radio"]:checked + label {
  color: #333;
  font-weight: 700;
}
input[type="radio"]:checked + label span {
  background-color: #eaee14;
  border: 2px solid #140a0a;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}
input[type="radio"] + label span,
input[type="radio"]:checked + label span {
  -webkit-transition: background-color 0.24s linear;
  -o-transition: background-color 0.24s linear;
  -moz-transition: background-color 0.24s linear;
  transition: background-color 0.24s linear;
}
</style>

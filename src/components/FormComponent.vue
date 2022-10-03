<!-- eslint-disable prettier/prettier -->
<template>
  <div class="principal">
    <div class="div--container">
      <vue-form
        :state="formStateProducts"
        @submit.prevent="productAdd()"
        name="resgiterProduct"
        class="form"
      >
        <validate tag="label" :custom="{ customValidator: customValidator }">
          <div class="renglon">
            <p>Nombre*:</p>
            <input
              v-model.trim="product.name"
              type="text"
              required
              name="name"
            />
            <field-messages class="etiqueta" name="name">
              <div>Ok.</div>
              <div slot="required">Ingrese un nombre por favor.</div>
              <div slot="customValidator">
                Ya existe un produto con el mismo nombre. Intente otro.
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

        <validate
          tag="label"
          :custom="{ categoryValidator: categoryValidator }"
        >
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
            {{etiqueta}}
          </button>
        </div>
      </vue-form>
    </div>
    <div>
      <br />
      <TableComponente
        @productController="productController($event)"
      ></TableComponente>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableComponente from "@/components/TableComponente.vue";

export default {
  name: "FormComponent",
  /*
  props: {
    // products: [],
  },
  */
  components: {
    TableComponente,
  },
  created() {
    // this.product = this.productInit;
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
        id_producto: 0,
        cant: 0,
        negocio: 0,
        image: "",
      },
      etiqueta: "Nuevo",
    };
  },
  methods: {
    async productAdd() {
      if (this.formStateProducts.$invalid) {
        alert("Los datos no son correctos. Verifiquelos por favor.");
        return;
      }
      if (this.productNew) {
        // alert("Guardamos el item");
        const objProduct = Object.assign({}, this.product);
        const id = this.products.length + 1;
        objProduct.id = id;
        objProduct.id_producto = id;
        await this.productSave(objProduct)
          .then((resp) => {
            console.log(resp);
            this.$alert("Se ha creado el producto.", "Atención", "success");
            this.$store.dispatch("productsFromApi");
            this.resetProduct();
          })
          .catch((err) => {
            this.$alert(
              `No pudo crearse el producto. Intente de nuevo. ${err}`
            );
          })
          .finally();
        // console.log("producto.add");
      } else {
        // actualizar...
        this.$confirm(
          "¿Seguro desea actualizar este producto?",
          "Atención",
          "question"
        ).then(async () => {
          await this.$store
            .dispatch("productUpdate", this.product)
            .then((resp) => {
              console.log(resp);
              this.$alert(
                "Se ha modificado el producto.",
                "Atención",
                "success"
              );
              this.$store.dispatch("productsFromApi");
              this.resetProduct();
            })
            .catch((err) => {
              this.$alert(
                `No se pudo actualizar el producto. Intente de nuevo. ${err}`
              );
            })
            .finally();
        });
      }
    },
    async productSave(objToSave) {
      await this.$store.dispatch("productSave", objToSave);
    },

    resetProduct() {
      this.product = {
        id: "",
        name: "",
        price: "",
        category: "",
        activo: 1,
        id_producto: 0,
        cant: 0,
        negocio: 0,
        image: "",
      };
      this.etiqueta = "Nuevo";
    },
    async productController(objController) {
      if (objController.function === "update") {
        this.product.id = objController.product.id;
        this.product.name = objController.product.name;
        this.product.price = objController.product.price;
        this.product.category = objController.product.category;
        this.product.activo = objController.product.activo;
        this.product.id_producto = objController.product.id_producto;
        this.product.cant = objController.product.cant;
        this.product.negocio = objController.product.negocio;
        this.product.image = objController.product.image;

        this.etiqueta = "Actualizar";
      } else {
        //delete
        this.$confirm(
          "¿Seguro desea eliminar este producto?",
          "Atención",
          "question"
        )
          .then(async () => {
            let id = objController.product.id_producto;
            await this.$store
              .dispatch("productDelete", id)
              .then(async () => {
                this.$alert("Se ha creado el producto.", "Atención", "success");
                await this.$store.dispatch("productsFromApi");
                this.resetProduct();
              })
              .catch(console.log("no se borro el producto"));
          })
          .catch(console.log("error en el cancel o dijo que no"));
      }
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
      let param = this.product.name.toUpperCase();

      let prodExists = this.products.find((prod) => {
        let valor = prod.name;
        let compareValue = valor.toUpperCase();
        // && prod.id !== this.product.id
        return compareValue === param;
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
    onCancel() {
      console.log("User cancelled the loader.");
    },
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
    products() {
      return this.$store.getters.getProducts;
    },
    productNew() {
      return this.etiqueta === "Nuevo";
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
  flex-direction: column;
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

<template>
  <v-card class="mx-auto" style="max-width: 500px;">
    <v-toolbar color="success accent-4" cards dark flat>
      <v-card-title class="title font-weight-regular">Add New Product</v-card-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form ref="form" v-model="form" class="pa-3 pt-4">
      <v-text-field
        v-model="name"
        :rules="[rules.length(4)]"
        box
        color="deep-purple"
        label="Name"
        style="min-height: 96px"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="stock"
        :rules="[rules.stock]"
        box
        color="deep-purple"
        label="Stock"
        style="min-height: 96px"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="price"
        :rules="[rules.price]"
        box
        color="deep-purple"
        label="Price"
        style="min-height: 96px"
        type="text"
      ></v-text-field>

      <v-textarea
        v-model="description"
        auto-grow
        :rules="[rules.length(4)]"
        box
        color="deep-purple"
        label="Description"
        rows="1"
      ></v-textarea>
      <input v-on:change="getImage" type="file">
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn flat @click="$refs.form.reset()">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        @click="addProduct"
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >Submit</v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" absolute max-width="400" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-3">Legal</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat @click="agreement = false, dialog = false">No</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="deep-purple accent-4"
            @click="agreement = true, dialog = false"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: "",
    stock: "",
    price: "",
    image : '',
    description: "",
    agreement: false,
    bio:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts",
    dialog: false,
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    rules: {
      email: v => (v || "").match(/@/) || "Please enter a valid email",
      length: len => v =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      stock: v =>
        (v || "").match(/^[0-9]*$/) ||
        "Stock must be only number and cannot be 0",
      required: v => !!v || "This field is required",
      price: v =>
        (v || "").match(/^[0-9]*$/) ||
        "Price must be only number and cannot be 0"
    }
  }),
  methods: {
    getImage(event) {
      this.image = event.target.files[0];
      console.log("disini", this.image, "//////////");
    },
    addProduct() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("stock", this.stock);
      formData.append("price", this.price);
      formData.append("image", this.image);
      console.log(formData, "ini form data");
      this.axios.post(`products`, formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      })
        .then(response => {
          let { data } = response;
          this.$swal("Product Added!", "View it on your dashboard", "success");
          this.name= ""
          this.stock= ""
          this.price= ""
          this.description= ""
        })
        .catch(function(err, textStatus) {
            console.log(err)
          this.$swal({
            text: "Something is wrong",
            icon: "warning",
            button: "Understood"
          });
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 50% !important;
}
</style>

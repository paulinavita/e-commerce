<template>
  <v-container fluid grid-list-md>
    <v-layout justify-center row wrap>
      <v-flex d-flex lg2>
        <v-card flat color="transparent">
          <v-card-text>
            <router-link to="/secret/">
              <v-btn outline color="success">Main</v-btn>
            </router-link>
            <br>
            <router-link to="/secret/add">
              <v-btn @click="changeToAdd" outline color="success">Add Products</v-btn>
            </router-link>
            <br>
            <router-link to="/secret/edit">
              <v-btn @click="changeToEdit" outline color="success">Edit Products</v-btn>
            </router-link>

          </v-card-text>
        </v-card>
      </v-flex>
      <Transactions v-if="this.$route.name == 'secret'" :datatrans="listTrans"/>
      <v-flex d-flex lg9>
        <router-view
        @change-to-edit="changeToEdit"
        @change-to-add="changeToAdd"
        @delete-product="deleteProduct"
         :datatrans="listTrans"
        :arrProducts="arrProducts" ></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import Edit from "./Edit.vue";
import Transactions from "../components/Transactions.vue"
export default {
  
  components: { Edit, Transactions },
  data() {
    return {
      mode : 'new',
      isLogin: false,
      arrProducts: [],
      listTrans : [],
      headers: [
        {
          text: "Product Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Price (IDR)", value: "price" },
        { text: "Stock (pcs)", value: "stock" },
        { text: "Description", value: "description" },
        { text: "Image", value: "image" }
      ]
    };
  },
  computed: {
    filteredProduct() {
      return this.productList.filter(prod => {
        return prod.name.match(this.searchData);
      });
    }
  },
  created() {
    // console.log(this.$route);
    
    this.getAllProducts();
    this.fetchTrans()
  },
  methods: {
    getAllProducts() {
      this.axios
        .get(`products`)
        .then(({ data }) => {
          this.arrProducts = data;
        })
        .catch(err => {
          this.$swal("Something is wrong", "", "error");
        });
    },
    deleteProduct(toDeleteId) {
      // console.log('coba gak dapet id nya dari emit', toDeleteId, '+++++++');

      this.$swal({
        title: "Are you sure?",
        text: "This product will not go on sell anymore",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.axios
            .delete(`products/${toDeleteId}`, {
              headers: { token: localStorage.getItem("token") }
            })
            .then(({ data }) => {
              swal(`Deleted ${data.name}`, {
                icon: "success"
              })
              this.getAllProducts()
            })
            .catch(err => {
              this.$swal("Something is wrong", 'warning');
            });
        } else {
          this.$swal("Action cancelled. Product still on the sell");
        }
      });
    },
    fetchTrans() {
      this.axios
        .get(`transactions`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          // console.log(data, "DAPAT APA??");
          this.listTrans = data;
          // console.log(this.listTrans, '////');
          
        })
        .catch(err => {
          this.$swal("Something is wrong", 'warning');
          // console.log(err.response);
        });
    },
    changeToAdd() {
      this.mode = 'new'
    },
    changeToEdit() {
      this.mode = 'edit'
      
    }
  }
};
</script>

<style>
</style>

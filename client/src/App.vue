<template>
  <v-app class="white">
    <nav  style="opacity: 0.5; filter: alpha(opacity=50); text-decoration:none">
      <v-toolbar flat>
        <router-link to="/">
          <!-- START NON LOGGED IN -->
          <v-toolbar-title  class="text-uppercase grey--text">
            <span class="font-weight-light">EPICLESIS</span>
            <span>HILL</span>
          </v-toolbar-title>
        </router-link>

        <router-link to="/signin/local">
          <v-btn v-if="!isLogin" flat color="grey">
            <span>Sign In</span>
            <v-icon right>face</v-icon>
          </v-btn>
        </router-link>
        <router-link  to="/users">
          <v-btn v-if="!isLogin" flat color="grey">
            <span>Register</span>
            <v-icon right>gesture</v-icon>
          </v-btn>
        </router-link>
        <!-- ENG OF NAVBAR NON LOGGED IN -->

        <!-- START BUTTON APPEARING ON LOGGED IN -->
        <router-link to="/products">
        <v-btn @click.prevent="getProducts" flat color="grey" v-if="isLogin" >
          <span>Stores</span>
        </v-btn>
        </router-link>
          <v-spacer></v-spacer>
        <v-flex xs12 sm6 md3>
          <v-text-field light width=10 height=20 prepend-icon="search" v-if="isLogin"  v-model="search" label="Search"></v-text-field>
        </v-flex>
            <v-spacer></v-spacer>

        <v-badge v-if="isLogin" left>
      <template v-slot:badge>
        <span>{{totalProductsOnCart}}</span>
      </template>
      <v-icon color="grey lighten-1"> shopping_cart </v-icon>
    </v-badge>
        <v-btn flat color="grey" v-if="isLogin" @click.prevent="getCheckout">
          <v-icon>shopping_basket</v-icon>
          <span>Cart</span>
        </v-btn>
        <v-btn flat color="grey" v-if="isLogin && role == 'admin'" @click="getAdminPage">
          <span>Admin</span>
          <v-icon>fingerprint</v-icon>
        </v-btn>
        <v-btn flat color="grey" v-if="isLogin" @click.prevent="signOut">
          <span>Sign Out</span>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <!-- END OF BUTTON APPEARING ON LOGGED IN -->
      </v-toolbar>

    </nav>

    <v-content>
      <router-view 
       @success-register="successRegister"
       @success-login="successLogin"
       @inc-qty="getCartAmount"
       @dec-qty="getCartAmount"
       @add-new-product-fetch="getCartAmount"
       @delete-whole-card="getCartAmount"
       @after-checkout="getCartAmount"
       @addNewProductFetch='addNewProductFetch'
       :searchData="search"
       :cartItems="cartItems"
       ></router-view>
    </v-content>


    <!-- START ON FOOTER -->
    <template>
      <v-footer white height="50px">
        <v-card class="flex" flat tile>
          <v-card-actions class="white justify-center">
            &copy;2019 —
            <strong>EpiclesisHill</strong>
          </v-card-actions>
        </v-card>
      </v-footer>
    </template>
    <!-- END OF FOOTER -->
  </v-app>
</template>

<script>
// import {bus} from '../main'

export default {
  name: "App",
  components: {},
  data() {
    return {
      totalProductsOnCart : 0,
      role : '',
      search: '',
      cartItems : [],
      isLogin: false
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.role = localStorage.getItem('role')
      this.getCartAmount()
    }
  },
  methods: {
    successRegister() {
      this.$swal({
        title: "Please login to proceed",
        icon: "success",
      }); 
      this.$router.push({ path: "/signin/local" });
    },
    successLogin() {
      this.$router.push({ path: "/" });
      this.role = localStorage.getItem('role')
      this.$swal({
        title: "We have so much to offer!",
        text: "Check out our store page",
        icon: "success",
      }); 
      this.isLogin = true;
    },
    signOut() {
      localStorage.clear();
      this.isLogin = false;
      this.$swal({
        title: "Thank you for checking our store",
        text: "See you",
        icon: "success",
      });      
      this.$router.push({ path: "/" });
    },
    getProducts() {
      this.$router.push({ path: "/products" });
    },
    getAdminPage() {
      this.$router.push({path : "/secret"})
    },
    getCheckout() {
      this.getCartAmount()
      this.$router.push({path: "/checkout"})
    },
    getCartAmount() {
      this.axios.get('carts', {
        headers: {
          token: localStorage.getItem("token")
          }
      })
      .then(({data}) => {
        console.log(data);
        this.cartItems = data 
        // totalProductsOnCart;
        this.totalProductsOnCart = 0
        data.forEach(cart => {
          this.totalProductsOnCart += +cart.amount
        });
        
      })
      .catch(err => {
        console.log(err.response);
        this.$swal('Something is wrong', 'warning')
      })
    },
    thousandSeparator (num) {
      num = String(num)
      return (
        num
          .replace('.', ',')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      )
    },
    addNewProductFetch() {
      this.getCartAmount()
    }
  }
};
</script>

<style>
span {
  text-decoration: none;
}

router-link {
  text-decoration: none  !important;
}
</style>
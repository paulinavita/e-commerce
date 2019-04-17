<template>
  <v-app class="grey lighten-3">
    <nav>
      <v-toolbar flat app>
        <router-link to="/">
          <!-- START NON LOGGED IN -->
          <v-toolbar-title class="text-uppercase grey--text">
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
        <router-link to="/users">
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
        <v-flex xs12 sm6 md3>
          <v-text-field height=25 prepend-icon="search" v-if="isLogin"  v-model="search" label="Search"></v-text-field>
        </v-flex>
        <v-btn flat color="grey" v-if="isLogin" @click.prevent="signOut">
          <span>Sign Out</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
        <v-btn flat color="grey" v-if="isLogin" @click.prevent="Cart">
          <v-icon right>shopping_basket</v-icon>
        </v-btn>
        <v-btn flat color="grey" v-if="isLogin && role == 'admin'" @click="getAdminPage()">
          <v-icon right>fingerprint</v-icon>
        </v-btn>
        <!-- END OF BUTTON APPEARING ON LOGGED IN -->
      </v-toolbar>

    </nav>

    <v-content>
      <router-view 
      @success-register="successRegister"
       @success-login="successLogin"
       :searchData="search"

       ></router-view>
    </v-content>


    <!-- START ON FOOTER -->
    <template>
      <v-footer dark height="auto">
        <v-card class="flex" flat tile>
          <v-card-actions class="grey darken-3 justify-center">
            &copy;2019 —
            <strong>Vuetify</strong>
          </v-card-actions>
        </v-card>
      </v-footer>
    </template>
    <!-- END OF FOOTER -->
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      role : '',
      search: '',
      isLogin: false,
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ]
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.role = localStorage.getItem('role')
    }
  },
  methods: {
    successRegister() {
      this.$router.push({ path: "/signin/local" });
    },
    successLogin() {
      this.$router.push({ path: "/" });
      this.role = localStorage.getItem('role')
      this.isLogin = true;
    },
    signOut() {
      localStorage.clear();
      this.isLogin = false;
      this.$router.push({ path: "/signin/local" });
    },
    getProducts() {
      this.$router.push({ path: "/products" });
    },
    getAdminPage() {
      this.$router.push({path : "/secret"})
    }
  }
};
</script>

<style>
span {
  text-decoration: none;
}

</style>
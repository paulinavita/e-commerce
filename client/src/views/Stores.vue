<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <Blok
        v-for="(product, index) in filteredProduct"
        v-bind:key="index"
        v-bind:name="product.name"
        v-bind:price="product.price"
        v-bind:description="product.description"
        v-bind:stock="product.stock"
        v-bind:image="product.image"
      />
    </v-layout>
  </v-container>
</template>

<script>
import Blok from '../components/Blok.vue'
export default {
  components: {Blok},
  props : ['searchData'],
  data() {
    return {
      drawer: false,
      isLogin: false,
      productList : [],
    }
  },
  computed: {
    filteredProduct () {
      return this.productList.filter((prod) => {
          return prod.name.match(this.searchData)
      })
    } 
  },
  created() {
      this.getAllProducts()
  },
  methods: {
    getAllProducts() {
        this.axios.get(`products`)
        .then(({data}) => {
            this.productList = data
            
        })
        .catch(err => {
            this.$swal('Something is wrong', '', 'error')
        })
    }
  },
}
</script>

<style scoped>

.container {
  width: 80%
}
</style>

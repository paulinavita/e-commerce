<template>
  <v-container grid-list-lg>
    <v-layout align-center justify-center row wrap>
      <Blok md4
        v-for="product in filteredProduct"
        v-bind:key="product._id"
        v-bind:name="product.name"
        v-bind:price="product.price"
        v-bind:description="product.description"
        v-bind:stock="product.stock"
        v-bind:image="product.image"
        v-bind:_id="product._id"
      />
   </v-layout>
  </v-container>
</template>

<script>
import Blok from '../components/Blok.vue'
export default {
  components: {Blok},
  props : ['searchData', 'thousandSeparator'],
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
    },
  },
}
</script>

<style scoped>

.container {
  width: 80%
}
</style>

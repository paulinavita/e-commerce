<template> 
   <v-flex md3 ma-4>
      <v-hover>
      <v-card flat
      slot-scope="{hover}"
      color="white"
      max-width="300"
      min-width="300"
      >
        <v-img
          class="white--text"
          height="200px"
          v-bind:src="image"
        >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out grey darken-2 v-card--reveal display-2 white--text"
            style="height: 100%;"
          >IDR{{price.toLocaleString()}}
          </div>
        </v-expand-transition>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <span class="headline black--text">{{name}}</span>

          <div>
          </div>
        </v-card-title>
        <v-card-actions>
          <popup
          v-bind:name="name"
          v-bind:description="description"
          v-bind:stock="stock"
          v-bind:price="price"
          v-bind:image="image"
          v-bind:_id="_id"

          ></popup>
        </v-card-actions>
      </v-card>
    </v-hover>
    </v-flex>
</template> 


<script>
import popup from './Modal.vue'
export default {
  props : ['name', 'price', 'stock', 'image', 'description', '_id'],
  data() {
    return {
      isAdmin : false
    }
  },
  components : {popup},
  created() {
      if (localStorage.getItem('role') == 'admin') {
        this.isAdmin = true
    }
  },
  methods: {
    addToCart() {
      // this.$emit('add-to-cart')
    }
  },
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>


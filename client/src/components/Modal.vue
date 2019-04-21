<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn flat color="success lighten-2" dark v-on="on">See More</v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline display-2 font-weight-light purple--text mb-2"
          primary-title
        >{{name}}</v-card-title>

        <v-card-text>
          <v-img :aspect-ratio="4/3" v-bind:src="image"></v-img>
          <span class="display mb-2">
            <b>Description :</b>
            {{description}}
          </span>
          <br>
          <span>
            <b>Stock :</b>
            {{stock}}
          </span>
          <br>
          <span>
            <b>Price :</b>
            {{price}}
          </span>
          <br>
        </v-card-text>

        <v-divider></v-divider>
        
          
        <v-card-actions>
            <span class="success--text"> QTY </span>
            <v-btn @click="subsQty" flat icon color="pink">
            <v-icon>keyboard_arrow_down</v-icon>
            </v-btn><br>
            <span>{{ total }}</span>
          <v-btn :disabled="isDisable()" @click="addQty" flat icon color="pink">
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
          <v-btn color="primary" flat @click="addToCart('_id')">Add To Cart</v-btn>
             <v-spacer></v-spacer>

            <v-btn color="primary" flat @click="dialog = false">Close</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["name", "price", "stock", "image", "description", "_id"],
  data() {
    return {
      dialog : false,
        total : 0
    }
  }, 
  methods: {
    isDisable() {
      if (this.total >= this.stock) return true 
      else return false
    },
    addToCart() {
      console.log(this._id);
      console.log(localStorage.getItem('id'),this._id, this.total);
      this.axios.post('carts', 
      {
          userId : localStorage.getItem('userId'),
          productId : this._id,
          amount : this.total
      },
      { headers : {
          token : localStorage.getItem('token')
      }
      })
      .then(({data}) => {
        this.$swal("Added to cart", "success");
        this.$emit('add-new-product-fetch')
        // console.log(data, 'dapet apa ya');  
      })
      .catch(err => {
        console.log(err);
        
        console.log((err.response, 'errr bagian add to cart?'));
        
      })
      
    },
      addQty() {
          this.total++
    },
      subsQty() {
          if (this.total > 0) {
            this.total --
          }
    }
  },
};
</script>

<style>
</style>

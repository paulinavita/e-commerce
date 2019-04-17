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
          <v-btn @click="addQty" flat icon color="pink">
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
          <v-btn color="primary" flat @click="dialog = true">Add To Cart</v-btn>
             <v-spacer></v-spacer>

            <v-btn color="primary" flat @click="dialog = true">Close</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["name", "price", "stock", "image", "description"],
  data() {
    return {
        dialog : false,
        total : 0
    }
  }, methods: {
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

<template>
    <v-container fluid grid-list-md>
    <v-layout justify-center row wrap>
      <v-flex d-flex lg12>
        <v-card color="transparent" >
          <v-card-title primary class="title">Items on Database</v-card-title>
          <v-card-text v-if="errorMoreThanStock" class="red--text"> The items you are buying is more than what we have in stock</v-card-text>
          <v-card-text>
            <v-data-table
          :headers="headers"
          :items="arrProducts" 
          >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.price }}</td>
          <td class="text-xs-center">{{ props.item.stock }}</td>
          <td class="text-xs-center">{{ props.item.description }}</td>
          <td class="text-xs-center"><img style="width:55px;height:auto;" v-bind:src="props.item.image"/></td>
          <td class="text-xs-center"><router-link style="text-decoration: none;" :to="{name: 'editById', params :{id : props.item._id} }"><v-btn flat color="success">Edit</v-btn></router-link></td>
          <td class="text-xs-center"><v-btn flat @click="deleteProduct(props.item._id)" color="success">Delete</v-btn></td>
          <!-- v-on:click="$emit('mode-edit', props.item._id)"  -->
        </template>
        </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>  
    </v-layout>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
    props : ['arrProducts'],
    created() {
    },
    data() {
        return {
        status : '',
        errorMoreThanStock : false,
        loading: false,
        sumPrice: 0,
        headers: [
          {
            text: 'Product Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Price (IDR)', value: 'price', sortable: true},
          { text: 'Stock (pcs)', value: 'stock', sortable: true },
          { text: 'Description', value: 'description', sortable: false },
          { text: 'Image', value: 'image', sortable: false },
          { text: 'Edit', value: 'edit', sortable: false},
          { text: 'Delete', value: 'delete', sortable: false}

        ]
      }
    },
    methods: {
        deleteProduct(toDeleteId) {
            this.$emit('delete-product', toDeleteId)   
        }
    },
}
</script>

<style>

</style>

<template>
    <!-- <p>{{datatrans}} haloo???</p> -->
  <v-data-table
    :headers="headers"
    :items="datatrans"
    class="elevation-1"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
    sort-icon="mdi-menu-down"
  >

    <template v-slot:items="props">
      <td>{{ props.item._id }}</td>
      <td class="text-xs-right">{{ props.item.userId.name }}</td>
      <td class="text-xs-right">{{ props.item.userId.address }}</td>
      <td class="text-xs-left">
          <ul v-for="(cart, index) in props.item.carts" :key="index" >
             <li style="list-style-type: none;">
                 {{cart.productId.name}}
             </li>
          </ul>
      </td>
      <td class="text-xs-right">{{ props.item.createdAt.split('T')[0] }}</td>
      <td class="text-xs-right">{{ props.item.total }}</td>
    </template>
   </v-data-table> 
</template>

<script>
export default {
props : ['datatrans'],
  data() {
    return {
      headers: [
        {text: "Transaction History ID", value: "transactionId"},
        { text: "Customer", value: "customer" },
        { text: "Delivery", value: "delivery" },
        { text: "Products", value: "products" },
        { text: "Transaction Date", value: "createdAt" },
        { text: "Total Price (IDR)", value: "total" },
      ]
    };
  },
  methods: {
      created() {
        //   console.log('MASUK KE FILE INI?');
          
      }
  }
};
</script>
    

<style>
</style>

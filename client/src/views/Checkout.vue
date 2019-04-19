<template>
  <v-container fluid grid-list-md>
    <v-layout justify-center row wrap>
      <v-flex d-flex lg8>
        <v-card color="transparent" >
          <v-card-title primary class="title">Items In Cart</v-card-title>
          <v-card-text v-if="errorMoreThanStock" class="red--text"> The items you are buying is more than what we have in stock</v-card-text>
          <v-card-text>
            <v-data-table
          :headers="headers"
          :items="cartItems" 
          >
        <template v-slot:items="props">
          <td>{{ props.item.productId.name }}</td>
          <td class="text-xs-center">{{ props.item.productId.price }}</td>
          <td class="text-xs-center">{{ props.item.amount }}</td>
          <td class="text-xs-center"> {{ totalAmount(props.item.productId.price, props.item.amount) }}</td>
          <td class="text-xs-center"> 
            <div>
            <v-btn left :disabled="isDisable(props.item.amount)" @click="subsQty(props.item._id)" flat icon color="success">
            <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
          <v-btn left :disabled="isMoreThanStock(props.item.amount, props.item.productId.stock)" @click="addQty(props.item._id)" flat icon color="success">
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
            </div>
          </td>
          <td class="text-xs-center">
            <v-btn justify-center @click="deleteCart(props.item._id)" flat icon color="success">
            <v-icon>close</v-icon>
            </v-btn>
          </td>
        </template>
  </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
      
      <v-flex d-flex lg2>
        <v-card color="transparent" dark>
          <v-card-title primary class="title font-weight-bold black--text">Order Summary</v-card-title>
          <v-card-title ml-4 class="display-1 font-weight-bold success--text" >IDR {{getTotalCart}}</v-card-title>
          <v-btn @click="checkOut" align-end outline color="success">Proceed To Order</v-btn>
            <!-- <Loading v-if="loading"/> -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Load from '../components/Load.vue'
  export default {
    props : ['cartItems'],
    components : {Load},
    data () {
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
          { text: 'Price (IDR)', value: 'price', sortable: true,},
          { text: 'Quantity (pcs)', value: 'amount', sortable: true,},
          { text: 'Subtotal (IDR)', value: 'total' , sortable: false },
          { text: 'Action', value: 'action'  , sortable: false},
          { text: 'Delete', value: 'delete'  , sortable: false}

        ]
      }
    },
    created() {
      // this.calculate()
    },
    computed: {
    getTotalCart() {
      let total = 0
      this.cartItems.forEach(item => total += (item.amount * item.productId.price))
      this.sumPrice = total
      return total
    }
  }, 
    methods : {
      refetch() {
        return this.cartItems
      },
      totalAmount (price, qty) {
        // this.sum += (+price * +qty)
        return (+price * +qty)
      },
      addQty(idCart) {
        this.axios.put(`carts/${idCart}`,
        { type : 'inc' },
        { headers : {token : localStorage.getItem('token'), cartId : idCart} })
        .then(({data}) => {
          console.log(data);
          this.$emit('inc-qty')
          this.changeStockWarning(data.amount, data.productId.stock) 
        })
        .catch(err => {
          console.log(err);
        })
      },
      subsQty(idCart) {
        this.axios.put(`carts/${idCart}`,
        { type : 'dec' },
        { headers : {token : localStorage.getItem('token'), cartId : idCart} })
        .then(({data}) => {
          console.log(data);
          this.$emit('dec-qty')
          this.changeStockWarning(data.amount, data.productId.stock) 
        })
        .catch(err => {
          console.log(err);
        })
      },
      isDisable(amt) {
        if (amt == 0) {
          return true
        } else return false
      },
      isMoreThanStock(amt, stock) {
        if (amt >= stock) {
          return true
        } else return false
      },
      changeStockWarning(amt,stock) {
        if (amt >= stock) {
          this.errorMoreThanStock = true
        } else this.errorMoreThanStock = false
      },
      deleteCart(cartId) {
        this.axios.delete(`carts/${cartId}`,{
            headers: {
              'token': localStorage.getItem('token'),
              'cartid' : cartId
            }
          })
        .then(({data}) => {
          console.log((data), 'apakah sudah hilang?');
          this.$emit('delete-whole-card', cartId)
        })
        .catch(err => {
          console.log(err.response, '//');
          
          this.$swal('Something is wrong', 'warning')
        })
      },
      checkOut() {
        if (this.sumPrice == 0) {
          this.$swal("You haven't bought anything from us yet ):")
        } else {
          this.axios.delete(`carts/checkout`, {
              headers: {
                'token': localStorage.getItem('token')
              }
          }) 
          .then(({data}) => {
            console.log(data, 'dapet apa????');
            this.$swal('Thank you for shopping with us!', 'warning')
            this.$emit('after-checkout')
  
          })
          .catch(err => {
              this.$swal('Something is wrong', 'warning')
          })    
        }
      }
    }
  }
</script>

<style>

</style>

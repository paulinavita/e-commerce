<template>
  <div>
    <div class="admin-new">
      <div class="container">
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <ul class="admin-menu">
            <!-- Links are to sibling routes -->
            <li><router-link to="/secret/add">View Products</router-link></li>
            <!-- <li @click="goToEdit"><router-link to="/secret/edit/{{$route.params.id}}">New Product</router-link></li> -->
          </ul>
        </div>
        <!-- Outlet for children routes -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            id : 10
        }
    },
    methods : {
        // goToEdit() {
        //     this.$router.push({ name: 'edit', params:  })
        // }
    }
}
</script>

<style>

</style>

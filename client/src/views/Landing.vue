<template>
  <v-carousel flat hide-delimiters height="550px">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://smhttp-ssl-64693.nexcesscdn.net/media/codazon/slideshow/resize/1900x1000/healingcrystalsforsale.jpg'
          },
          {
            src: 'https://media.vogue.in/wp-content/uploads/2018/03/Why-Crystal-Healing-is-trending-right-now.jpg'
          },
          {
            src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/energy-muse-home-makeover-5-1506526729.jpg?crop=1.00xw:0.342xh;0,0.498xh&resize=1200:*'
          }
        ]
      }
    }
  }
</script>

<style>

</style>

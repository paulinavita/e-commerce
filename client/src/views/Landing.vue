<template>
  <v-carousel flat hide-delimiters height="100vh">
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
            src: 'https://cdn.shopify.com/s/files/1/1158/2544/files/celestial_slide_final_2000x.jpg?v=1526704355'
          },
          {
            src: 'https://cdn.shopify.com/s/files/1/0019/0352/5977/files/20170714-moondeck-photosbyhaana-3962-webrez_1240x.jpg?v=1537659136'
          },
          {
            src: 'https://cdn.shopify.com/s/files/1/1158/2544/files/modern_witch_slide_1_3ed26324-21af-4565-9760-822aa90aa15a_2000x.jpg?v=1526906527'
          }
        ]
      }
    }
  }
</script>

<style>

</style>

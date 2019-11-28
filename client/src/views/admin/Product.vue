<template>
  <div>
    <div v-for="product in allProducts" :key="product.id">
      {{ product.name }}
    </div>
  </div>
</template>
<script>
import api from '../../service/api'
import {mapState} from 'vuex'

export default {
  name: 'Product',
  data () {
    return {
      allProducts: null
    }
  },
  computed: mapState(['products']),
  watch: {
    products (newVal, oldVal) {
      this.allProducts = newVal
    }
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts () {
      await api.getAllProduct().then(res => {
        this.$store.dispatch('fillProducts', res.data)
      }).catch(err => {
        console.log(err.message);
      })
    }
  }
}
</script>
<style scoped>

</style>

<template>
  <div>
    <div v-for="product in products" :key="product.id">
      {{ product.name }}
    </div>
  </div>
</template>

<script>
import api from '../service/api'

export default {
  name: 'Index',
  data () {
    return {
      products: {}
    }
  },
  mounted () {
    this.loadProducts()
  },
  methods: {
    async loadProducts () {
      await api.getAllProduct().then(res => {
        this.products = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>

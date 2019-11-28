<template>
  <div class="product-main">
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th>_id</th>
          <th>Name</th>
          <th>Desc.</th>
          <th>Price (Rp.)</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in allProducts" :key="product.id">
          <td>{{product._id}}</td>
          <td>{{product.name}}</td>
          <td>{{product.description}}</td>
          <td>{{product.price}}</td>
          <td>
            <b-button class="is-danger">
              <font-awesome-icon :icon="['fa', 'trash']"/>
            </b-button>
          </td>
        </tr>
        </tbody>
      </table>
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
  mounted () {
    this.loadProducts()
  },
  methods: {
    async loadProducts () {
      await api.getAllProduct().then(res => {
        this.$store.dispatch('fillProducts', res.data)
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
}
</script>
<style scoped>
.product-main {
  padding: 10px
}
</style>

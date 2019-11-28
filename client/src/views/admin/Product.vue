<template>
  <section>
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Desc.</th>
          <th>Price (Rp.)</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in allProducts" :key="product.id">
          <td>
            <span class="title is-size-6">{{product.name}}</span> <br/>
            <span class="subtitle is-size-xs fade">{{product._id}}</span>
          </td>
          <td>{{product.description}}</td>
          <td>{{product.price}}</td>
          <td>
            <b-button class="is-danger" @click="deleteProduct(product._id)">
              <font-awesome-icon :icon="['fa', 'trash']"/>
            </b-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
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
    },
    async deleteProduct (id) {
      await api.deleteProduct(id).then(res => {
        console.log(res);
        this.loadProducts();
      }).catch(err => {
        console.log(err.message);
      })
    }
  }
}
</script>
<style scoped>
.is-size-xs {
  font-size: .7rem;
}
td {
  vertical-align: middle !important;
}
</style>

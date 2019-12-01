<template>
  <section>
    <div class="loading"
         v-if="allProducts == null">
      Loading...
    </div>

    <div class="table-container"
         v-if="allProducts != null">
      <table class="table is-narrow">
        <thead>
        <tr>
          <th>Name</th>
          <th>Desc.</th>
          <th>Duration (day(s))</th>
          <th>Price (Rp.)</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in allProducts" :key="product._id">
          <td>
            <span class="title is-size-6">{{product.name}}</span> <br/>
            <span class="tag is-size-xs fade">{{product._id}}</span>
          </td>
          <td>{{product.description}}</td>
          <td>{{product.duration}} day(s)</td>
          <td>Rp. {{moneyFormat(product.price)}}</td>
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
      await api.product.getAllProduct().then(res => {
        this.$store.dispatch('fillProducts', res.data)
      }).catch(err => {
        console.log(err.message)
      })
    },
    deleteProduct (id) {
      this.$buefy.dialog.confirm({
        title: 'Delete Product',
        message: 'Are you sure you want to <b>delete</b> this product? This action cannot be undone.',
        confirmText: 'Delete this Product',
        type: 'is-danger',
        hasIcon: true,
        icon: 'info-circle',
        iconPack: 'fas',
        size: 'is-small',
        onConfirm: async () => {
          await api.product.deleteProduct(id).then(res => {
            console.log(res)
            this.loadProducts()
          }).catch(err => {
            console.log(err.message)
          })
        }
      })
    },
    moneyFormat (number) {
      return (number).toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
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
.loading {
  width: 100%;
  min-height: 75vh;
  line-height: 75vh;
  font-size: 1rem;
  font-weight: bolder;
  color: #aaa;
  text-align: center;
}
</style>

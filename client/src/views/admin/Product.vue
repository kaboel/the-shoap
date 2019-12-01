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
          <th>Price (IDR)</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in allProducts" :key="product._id">
          <td>
            <span class="title is-size-6">{{product.name}}</span> <br/>
            <span class="tag is-size-xs fade"><b>#</b>{{product._id}}</span>
          </td>
          <td>{{product.description}}</td>
          <td>{{product.duration}} day(s)</td>
          <td>{{moneyFormat(product.price)}}</td>
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
        this.$buefy.toast.open({
          duration: 5000,
          message: err,
          position: 'is-top',
          type: 'is-danger'
        })
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
            this.$buefy.toast.open({
              duration: 3000,
              message: `Product deleted!`,
              type: 'is-success'
            })
          }).catch(err => {
            this.$buefy.toast.open({
              duration: 3000,
              message: err,
              type: 'is-danger'
            })
          })
        }
      })
    },
    moneyFormat (number) {
      return new Intl.NumberFormat('en-IDR', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      }).format(number);
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

<template>
  <section>
    <div class="loading"
         v-if="allOrders == null">
      Loading...
    </div>

    <div class="table-container"
         v-if="allOrders != null">
      <table>
        <thead>
        <tr>
          <th>Itinerary ID</th>
          <th>Status</th>
          <th>Customer Name</th>
          <th>Email</th>
          <th>Pick Up / Deliver</th>
          <th>Order Summary</th>
          <th>Subtotal (Rp.)</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in allOrders" :key="order._id">
          <td width="10">
            <span class="tag">
              <b>#</b>{{order._id}}
            </span>
          </td>
          <td width="10">
            <span class="tag is-success" v-if="order.status">
              <font-awesome-icon :icon="['fa', 'check']"/>&nbsp;&nbsp;Complete
            </span>
            <span class="tag is-warning" v-else>
              <font-awesome-icon :icon="['fa', 'sync-alt']"/>&nbsp;&nbsp;In Queue
            </span>
          </td>
          <td width="200">
            {{ order.name }}
          </td>
          <td width="200">
            {{ order.email }}
          </td>
          <td>
            {{ order.address }}
          </td>
          <td>
            <button class="button is-info is-small">
              View Summary &nbsp;&nbsp; <font-awesome-icon :icon="['fa', 'arrow-right']"/>
            </button>
          </td>
          <td>

          </td>
          <td>
            <button class="button is-success is-small" :disabled="order.status">
              Set as Complete &nbsp;&nbsp; <font-awesome-icon :icon="['fa', 'check']"/>
            </button>
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
  name: 'Order',
  data () {
    return {
      allOrders: null,
      allProducts: null
    }
  },
  computed: mapState(['orders', 'products']),
  watch: {
    orders (newVal, oldVal) {
      this.allOrders = newVal
    },
    products (newVal, oldVal) {
      this.allProducts = newVal
    }
  },
  mounted () {
    this.filterOrders()
  },
  methods: {
    async loadOrders () {
      await api.order.getAllOrders().then(res => {
        this.$store.dispatch('fillOrders', res.data)
      }).catch(err => {
        console.log(err)
      })
    },

    async loadProducts () {
      await api.product.getAllProduct().then(res => {
        this.$store.dispatch('fillProducts', res.data)
      }).catch(err => {
        console.log(err.message)
      })
    },

    filterOrders () {
      this.loadProducts()
      this.loadOrders()

      setTimeout(() => {
        this.allOrders()
      }, 3000)
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

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
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in allOrders" :key="order._id">
          <td>
            <span class="tag">
              <b>#</b>{{order._id}}
            </span>
          </td>
          <td>
            <span class="tag is-success" v-if="order.status">
              <font-awesome-icon :icon="['fa', 'check']"/>&nbsp;&nbsp;Complete
            </span>
            <span class="tag is-warning" v-else>
              <font-awesome-icon :icon="['fa', 'sync-alt']"/>&nbsp;&nbsp;In Queue
            </span>
          </td>
          <td>
            {{ order.name }}
          </td>
          <td>
            {{ order.email }}
          </td>
          <td>
            {{ order.address }}
          </td>
          <td>
            <button class="button is-info is-small" @click="sectionTo({parent: 'Orders', child: 'Detail', id: order._id})">
              View Summary &nbsp;&nbsp; <font-awesome-icon :icon="['fa', 'arrow-right']"/>
            </button>
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
      allOrders: null
    }
  },
  computed: mapState(['orders', 'types', 'products']),
  watch: {
    orders (newVal, oldVal) {
      this.allOrders = newVal
    },
    types (newVal, oldVal) {
      this.allTypes = newVal
    },
    products (newVal, oldVal) {
      this.allProducts = newVal
    }
  },
  mounted () {
    this.loadOrders()
    this.loadProducts()
    this.loadTypes()
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

    async loadTypes () {
      await api.type.getAllTypes().then(res => {
        this.$store.dispatch('fillTypes', res.data)
      }).catch(err => {
        console.log(err.message)
      })
    },

    moneyFormat (number) {
      return (number).toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },

    sectionTo (section) {
      let store = this.$store
      store.dispatch('sectionTo', section)
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

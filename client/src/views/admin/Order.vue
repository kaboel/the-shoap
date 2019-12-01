<template>
  <section>
    <div class="loading"
         v-if="allOrders == null">
      Loading...
    </div>

    <div class="loading" v-if="allOrders != null && allOrders.length < 1">
      No Data
    </div>

    <div class="table-container"
         v-if="allOrders != null && allOrders.length > 0">
      <table>
        <thead>
        <tr>
          <th>Product ID</th>
          <th>OD</th>
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
            {{ formatDate(order.createdAt) }}
          </td>
          <td>
            <div class="control">
              <b-taglist attached>
                <b-tag type="is-success" v-if="order.status">
                  <font-awesome-icon :icon="['fa', 'check']"/>
                </b-tag>
                <b-tag type="is-warning" v-if="!order.status">
                  <font-awesome-icon :icon="['fa', 'sync-alt']"/>
                </b-tag>
                <b-tag type="is-dark">
                  {{ formatDate(order.updatedAt) }}
                </b-tag>
              </b-taglist>
            </div>
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
              View Summary&nbsp;&nbsp;<font-awesome-icon :icon="['fa', 'arrow-right']"/>
            </button>
          </td>
          <td>
            <button class="button is-success is-small" :disabled="order.status">
              Complete Order&nbsp;&nbsp;<font-awesome-icon :icon="['fa', 'check']"/>
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
    }
  },
  computed: mapState(['sectionActive', 'orders', 'types', 'products']),
  watch: {
    orders (newVal, oldVal) {
      this.allOrders = newVal
    }
  },
  mounted () {
    this.loadData()
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

    loadData () {
      this.loadOrders()
      this.loadProducts()
      this.loadTypes()
    },

    formatDate (plain) {
      let date = new Date(plain)
      let d = date.getDate()
      let m = date.getMonth()
      let y = date.getFullYear()

      return `${m}/${d}/${y}`
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
    font-size: 1.3rem;
    font-weight: bolder;
    color: #aaa;
    text-align: center;
  }
</style>

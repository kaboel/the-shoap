<template>
  <section>
    <div class="loading"
         v-if="allOrders == null">
      Loading...
    </div>

    <div class="loading" v-if="allOrders != null && allOrders.length < 1">
      Oops! All of your Orders are still in queue :(
    </div>

    <div v-if="allOrders != null && allOrders.length > 0">
      <table>
        <thead>
        <tr>
          <th width="300">Order</th>
          <th>Customer Name</th>
          <th>Pick Up / Deliver</th>
          <th>Order Summary</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in allOrders" :key="order._id">
          <td>
            <div class="control">
              <b-taglist attached>
                <b-tag type="is-danger">
                  {{ formatDate(order.createdAt) }}
                </b-tag>
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
            <span class="tag">
              <b>#</b>{{order._id}}
            </span>
          </td>
          <td>
            {{ order.name }}
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
            <button class="button is-success is-small" @click="setComplete(order._id)" :disabled="order.status">
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
  name: 'OrderComplete',
  data () {
    return {
      allOrders: null
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
      await api.order.getOrderByStatus(true).then(res => {
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
      let M = date.getMonth()
      let y = date.getFullYear()

      let H = date.getHours()
      let m = date.getMinutes()
      let a = date.get

      return `${M}/${d}/${y} | ${H}:${m}`
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
    font-size: 1.4rem;
    font-weight: bolder;
    color: #aaa;
    text-align: center;
  }
</style>

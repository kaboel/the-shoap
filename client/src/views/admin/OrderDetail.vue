<template>
  <section>
    <div class="columns">
      <div class="column">
        <span class="title is-size-4">Order Summary</span>
        <span class="tag">
          <b>#</b>  {{ order._id }}
        </span>
        <span class="tag is-small is-success" v-if="order.status">
          <font-awesome-icon :icon="['fa', 'check']"/> &nbsp;
          Complete
        </span>
        <span class="tag is-small is-warning" v-else>
          <font-awesome-icon :icon="['fa', 'sync-alt']"/> &nbsp;
          In Queue
        </span>
      </div>
      <div class="column has-text-right">
        <span class="title is-size-6">
          {{ formatDate(order.createdAt) }}
        </span>
      </div>
    </div>

    <div class="container">
      <div class=""
    </div>


  </section>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'OrderDetail',
  data () {
    return {
      order: {},
      subOrder: []
    }
  },
  computed: mapState(['sectionActive', 'orders', 'products', 'types']),
  mounted() {
    this.setOrder()
  },
  methods: {
    setOrder () {
      let orders = this.orders
      let id = this.sectionActive.id
      orders.forEach(order => {
        if (order._id === id) {
          this.order = order
          this.subOrder = order.orders
        }
      })
    },

    formatDate (plain) {
      let date = new Date(plain)
      let d = date.getDate()
      let m = date.getMonth()
      let y = date.getFullYear()

      return `${m}/${d}/${y}`
    }
  }
}
</script>

<style scoped>

</style>

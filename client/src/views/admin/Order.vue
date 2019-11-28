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

        </tr>
        </thead>
        <tbody>
        <tr v-for="order in allProducts" :key="order._id">

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
    computed: mapState(['orders']),
    watch: {
      orders (newVal, oldVal) {
        this.allOrders = newVal
      }
    },
    mounted () {
      this.loadAllProducts()
    },
    methods: {
      async loadAllProducts () {
        await api.order.getAllOrders().then(res => {
          this.$store.dispatch('fillOrders', res.data)
        }).catch(err => {
          console.log(err.message)
        })
      },
      moneyFormat (number) {
        return (number)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,');
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

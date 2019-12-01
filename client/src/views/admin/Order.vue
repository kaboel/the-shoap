<template>
  <section>
    <div class="loading"
         v-if="allOrders == null">
      Loading...
    </div>

    <div class="loading" v-if="allOrders != null && allOrders.length < 1">
      Uh Oh! There is no Order for now.
    </div>

    <div v-if="allOrders != null && allOrders.length > 0">
      <div class="columns">
        <div class="column is-half">
          <div class="card-header">
            <div class="card-header-title" style="font-size: .8rem">
              <i>Color Explanatory</i>
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              <b-field grouped group-multiline>
                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-danger">[date]</b-tag>
                    <b-tag>Order made</b-tag>
                  </b-taglist>
                </div>

                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-warning"><font-awesome-icon :icon="['fa', 'sync-alt']"/></b-tag>
                    <b-tag>In queue</b-tag>
                  </b-taglist>
                </div>

                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-success"><font-awesome-icon :icon="['fa', 'check']"/></b-tag>
                    <b-tag>Complete</b-tag>
                  </b-taglist>
                </div>

                <div class="control">
                  <b-taglist attached>
                    <b-tag type="is-dark">[date]</b-tag>
                    <b-tag>Complete at</b-tag>
                  </b-taglist>
                </div>
              </b-field>
            </div>
          </div>
        </div>
      </div>

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
                <b-tag type="is-dark" v-if="order.status">
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
        this.$buefy.toast.open({
          duration: 5000,
          message: err,
          position: 'is-top',
          type: 'is-danger'
        })
      })
    },

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

    async loadTypes () {
      await api.type.getAllTypes().then(res => {
        this.$store.dispatch('fillTypes', res.data)
      }).catch(err => {
        this.$buefy.toast.open({
          duration: 5000,
          message: err,
          position: 'is-top',
          type: 'is-danger'
        })
      })
    },

    setComplete(id) {
      this.$buefy.dialog.confirm({
        title: 'Complete Order',
        message: 'Are you sure you want to <b>Complete</b> this order? This action cannot be undone.',
        confirmText: 'Yes, complete this Order',
        type: 'is-warning',
        hasIcon: true,
        icon: 'info-circle',
        iconPack: 'fas',
        size: 'is-small',
        onConfirm: async () => {
          await api.order.setComplete({id: id, status: true}).then(result => {
            this.sectionTo({parent: 'Orders', status: 'Complete'})
            this.$buefy.toast.open({
              duration: 3000,
              message: `Order Complete!`,
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

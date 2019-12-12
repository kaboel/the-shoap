<template>
  <section class="content">
    <div class="columns is-centered">
      <div class="column">
        <div class="columns is-centered">
          <div class="column is-two-fifths" :class="{'float': !found}">
            <div class="title is-size-5 has-text-centered">
              Check your order status
            </div>
            <b-field position="is-centered">
              <b-input size="is-large"
                       placeholder="Enter your code"
                       type="search"
                       icon="hashtag"
                       v-model="id"/>
              <p class="control">
                <button class="button is-dark is-large" @click="getOrder">Check</button>
              </p>
            </b-field>
          </div>
        </div>
        <div class="columns is-centered" v-if="!order.hasOwnProperty('_id') && found">
          <div class="column is-two-fifths not-found">
            <i>No order with given code found.</i>
          </div>
        </div>
        <div class="columns is-centered" v-if="found && order.hasOwnProperty('_id')">
          <div class="column is-three-quarters">
            <div class="card">
              <div class="card-content">
                <div class="columns">
                  <div class="column">
                    <b>Status:&nbsp;</b>
                    <b-tag size="is-medium" type="is-success" v-if="order.status">
                      <font-awesome-icon :icon="['fa', 'check']"/>
                      &nbsp;Complete
                    </b-tag>
                    <b-tag size="is-medium" type="is-warning" v-if="!order.status">
                      <font-awesome-icon :icon="['fa', 'sync-alt']"/>
                      &nbsp;In Queue
                    </b-tag>
                  </div>
                  <div class="column">
                    <div class="control">
                      <b-taglist style="float: right">
                        <b-tag><b>#</b>{{ order._id }}</b-tag>
                        <b-tooltip label="Date Ordered" type="is-danger">
                          <b-tag type="is-danger">{{ formatDate(order.createdAt) }}</b-tag>
                        </b-tooltip>&nbsp;&nbsp;
                        <b-tooltip label="Date Complete" type="is-dark">
                          <b-tag type="is-dark" v-if="order.status">{{ formatDate(order.updatedAt) }}</b-tag>
                        </b-tooltip>
                      </b-taglist>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="card">
                      <div class="card-header">
                        <span class="card-header-title">On behalf of</span>
                      </div>
                      <div class="card-content">
                        <b-field label="Name" label-position="inside">
                          <b-input v-model="order.name" disabled/>
                        </b-field>
                        <b-field label="Phone" label-position="inside">
                          <b-input v-model="order.phone" disabled/>
                        </b-field>
                        <b-field label="Email" label-position="inside">
                          <b-input v-model="order.email" disabled/>
                        </b-field>
                        <b-field label="Address" label-position="inside">
                          <b-input type="textarea" v-model="order.address" disabled/>
                        </b-field>
                      </div>
                    </div>
                  </div>
                  <div class="column is-three-quarters">
                    <div class="card">
                      <div class="card-content">
                        <table class="table is-bordered">
                          <thead>
                          <tr>
                            <th width="200">Product Service</th>
                            <th width="200">Shoe Type</th>
                            <th width="100">Note</th>
                            <th width="50" class="has-text-centered">Qty.</th>
                            <th width="200">Subtotal (IDR)</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="order in order.orders" :key="order._id">
                            <td>
                              <span class="title is-size-6">{{ order.product.name }}</span>
                              <span class="tag is-small is-info">{{ moneyFormat(order.product.price) }}</span>
                              <br/>
                              <span class="tag is-small">
                                <b>#</b>{{ order.product._id }}
                              </span>
                            </td>
                            <td>
                              <span class="title is-size-6">{{ order.type.name }}</span>
                              <span class="tag is-small is-info">+ {{ moneyFormat(order.type.extraPrice) }}</span>
                              <br/>
                              <span class="tag is-small">
                                <b>#</b>{{ order.type._id }}
                              </span>
                            </td>
                            <td>
                              {{ order.note }}
                            </td>
                            <td class="has-text-centered">
                              <span class="title is-size-6">
                                {{ order.amount }}
                                <font-awesome-icon class="fa-sm" :icon="['fa', 'times']"/>
                              </span>
                            </td>
                            <td>
                              <span class="title is-size-6">
                                {{ moneyFormat((order.product.price + order.type.extraPrice) * order.amount) }}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th colspan="4" class="has-text-right">Total (IDR) :</th>
                            <td>
                              <span class="title is-size-5">
                                {{ moneyFormat(order.total) }}
                              </span>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div class="card-footer-item">&nbsp;
                  <button class="button is-success" @click="">
                    Customer Service &nbsp;
                    <font-awesome-icon :icon="['fab', 'whatsapp']"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '../../service/api'

  export default {
  name: 'Status',
  data() {
    return {
      allOrders: [],
      allTypes: [],
      found: false,
      id: '',
      order: {}
    }
  },
  mounted() {
    this.allProducts = this.$store.getters.products
    this.allTypes = this.$store.getters.types
  },
  computed: mapState(['types', 'products']),
  watch: {
    id (newVal, oldVal) {
      if (newVal === '' || newVal === null) {
        this.resetPage()
      }
    },
    order (newVal, oldVal) {
      if (newVal) {
        this.filterOrders()
      }
    },
    'products': {
      handler (val) {
        this.allProducts = val
      }
    },
    'types': {
      handler (val) {
        this.allTypes = val
      }
    }
  },
  methods: {
    async getOrder () {
      if (this.id !== '') {
        await api.order.getOrderById(this.id).then(result => {
          this.order = result.data
        }).catch(err => {
          this.order = {}
          this.found = true
        })
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Please enter your order code',
          type: 'is-warning',
          position: 'is-bottom'
        })
      }
    },

    filterOrders() {
      let orders = this.order.orders

      if (orders) {
        orders.forEach((el, index) => {
          orders[index]["product"] = this.allProducts.find(product => product._id === el.productId)
        })
        orders.forEach((el, index) => {
          orders[index]["type"] = this.allTypes.find(type => type._id === el.typeId)
        })
        this.order.orders = orders

        this.setTotal()
      }
    },

    setTotal () {
      let orders = this.order.orders
      if (orders) {
        let total = 0
        orders.forEach(order => {
          total += (order.product.price + order.type.extraPrice) * order.amount
        })
        if (this.order) {
          this.order["total"] = total
          this.found = true
        }
      }
    },

    moneyFormat (number) {
      return new Intl.NumberFormat('en-IDR', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      }).format(number);
    },

    formatDate (plain) {
      let date = new Date(plain)
      let d = date.getDate()
      let M = date.getMonth()
      let y = date.getFullYear()

      let H = date.getHours()
      let m = date.getMinutes()

      return `${M}/${d}/${y} | ${H}:${m}`
    },

    resetPage() {
      this.order = {}
      this.found = false
    }
  }
}
</script>

<style scoped>
.content {
  padding: 0 40px 100px 40px;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
}
.float {
  position: relative;
  top: 18vh;
}
.not-found {
  width: 100%;
  min-height: 50vh;
  line-height: 50vh;
  font-size: 1.4rem;
  font-weight: bolder;
  color: #aaa;
  text-align: center;
}
table, tr, th, td {
  vertical-align: middle !important;
}
th {
  background-color: #ddd;
}
</style>

<template>
  <section>
    <div class="columns">
      <div class="column">
        <span class="title is-size-4">Order Summary</span><br/>
      </div>
      <div class="column">
        <div class="control">
          <b-taglist style="float: right">
            <b-tag><b>#</b>{{ order._id }}</b-tag>
            <b-tag type="is-danger" v-if="!order.status">{{ formatDate(order.createdAt) }}</b-tag>
            <b-tag type="is-dark" v-if="order.status">{{ formatDate(order.updatedAt) }}</b-tag>
            <b-tag type="is-success" v-if="order.status">
              <font-awesome-icon :icon="['fa', 'check']"/>
            </b-tag>
            <b-tag size="is-medium" type="is-warning" v-if="!order.status">
              <font-awesome-icon :icon="['fa', 'sync-alt']"/>
            </b-tag>
          </b-taglist>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-header">
            <span class="card-header-title">Order To</span>
          </div>
          <div class="card-content">
            <b-field label="Name" label-position="inside">
              <b-input v-model="order.name" disabled/>
            </b-field>
            <b-field label="Phone" label-position="inside">
              <b-input v-model="order.phone" disabled/>
              <p class="control">
                <b-tooltip label="Whatsapp" position="is-right">
                  <b-button class="button" @click="whatsappTo(order.phone)">
                    <font-awesome-icon :icon="['fab', 'whatsapp']"/>
                  </b-button>
                </b-tooltip>
              </p>
            </b-field>
            <b-field label="Email" label-position="inside">
              <b-input v-model="order.email" disabled/>
              <p class="control">
                <b-tooltip label="Email" position="is-right">
                  <b-button class="button" @click="mailTo(order.email)">
                    <font-awesome-icon :icon="['fa', 'mail-bulk']"/>
                  </b-button>
                </b-tooltip>
              </p>
            </b-field>
            <b-field label="Address" label-position="inside">
              <b-input type="textarea" v-model="order.address" disabled/>
            </b-field>
            <button class="button is-success" style="width: 100%" @click="setComplete(order._id)" :disabled="order.status">
              Complete This Order
            </button>
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
              <tr v-for="order in subOrder" :key="order._id">
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
  </section>
</template>

<script>
import {mapState} from 'vuex'
import api from "../../service/api";

export default {
  name: 'OrderDetail',
  data () {
    return {
      order: {},
      subOrder: []
    }
  },
  computed: mapState(['sectionActive', 'orders', 'products', 'types']),
  watch: {
    sectionActive (newVal, oldVal) {
      this.setOrder()
    }
  },
  mounted() {
    this.setOrder()
  },
  methods: {
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

    setOrder () {
      let orders = this.orders
      let id = this.sectionActive.id
      orders.forEach(order => {
        if (order._id === id) {
          this.order = order
          this.subOrder = order.orders
        }
      })
      this.setSubOrder()
    },

    setSubOrder () {
      let subOrders = this.subOrder
      subOrders.forEach((order, index) => {
        this.products.forEach(product => {
          if (product._id === order.productId) {
            this.subOrder[index]["product"] = product
          }
        })
        this.types.forEach(type => {
          if (type._id === order.typeId) {
            this.subOrder[index]["type"] = type
          }
        })
      })
      this.setTotal()
    },

    setTotal () {
      let orders = this.subOrder
      let total = 0
      orders.forEach(order => {
        total += (order.product.price + order.type.extraPrice) * order.amount
      })
      this.order["total"] = total
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
      let a = date.get

      return `${M}/${d}/${y} | ${H}:${m}`
    },

    mailTo (address) {
      window.location.href = `mailto:${address}`
    },

    whatsappTo (phone) {
      let number = phone;
      if (phone.substring(0, 2) === '62') {
        window.open(`https://wa.me/${phone}`, '_blank').focus()
      } else if (phone.substring(0, 1) === '0') {
        window.open(`https://wa.me/62${phone.substring(1)}`, '_blank').focus()
      }
    }
  }
}
</script>

<style scoped>
table, tr, th, td {
  vertical-align: middle !important;
}
th {
  background-color: #ddd;
}
</style>

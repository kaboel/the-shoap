<template>
  <section class="content">
    <div class="title is-size-4 has-text-centered">
      Your Order
    </div>
    <div class="columns">
      <div class="column">
        <b-steps type="is-info" size="is-medium" :has-navigation="false" v-model="activeStep">
          <b-step-item label="Profile" :clickable="false">
            <div class="columns is-centered">
              <div class="column is-two-thirds">
                <div class="card">
                  <div class="card-header">
                    <div class="custom-card-title">
                      <b><font-awesome-icon class="fa-xs" :icon="['fa', 'asterisk']"/></b>
                      <i style="color: #888">Please fill in the following fields</i>
                    </div>
                  </div>
                  <div class="card-content">
                    <div class="columns">
                      <div class="column">
                        <b-field label="*Your Surname" label-position="on-border">
                          <b-input type="text"
                                   v-model="customer.name"
                                   size="is-medium"
                                   placeholder="e.g. Boyke Wawink"
                                   required/>
                        </b-field>
                        <b-field label="*Your Email" label-position="on-border">
                          <b-input type="text"
                                   v-model="customer.email"
                                   size="is-medium"
                                   placeholder="e.g. boyke.wink@gmail.com"
                                   required/>
                        </b-field>
                        <b-field label="*Phone Number" label-position="on-border">
                          <b-input type="number"
                                   v-model="customer.phone"
                                   size="is-medium"
                                   placeholder="e.g. 081234xxx or 6281234xxx"
                                   required/>
                        </b-field>
                      </div>
                      <div class="column">
                        <b-field label="*Full Address (Pick Up / Delivery)" label-position="on-border">
                          <b-input type="textarea"
                                   v-model="customer.address"
                                   placeholder="e.g. Perum. Arab Only Kav. 0, Jl. Gua Hira, Dubai, Ngantang - 999"
                                   maxlength="300"
                                   rows="7"
                                   required/>
                        </b-field>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="card-footer-item">
                      <button class="button is-danger" @click="clearProfile">
                        Clear
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button class="button is-success" @click="nextStep">
                        Next &nbsp;
                        <font-awesome-icon :icon="['fa', 'chevron-right']"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-step-item>


          <b-step-item label="Order(s)" :clickable="false">
            <div class="columns is-centered">
              <div class="column is-two-thirds">
                <div class="card">
                  <div class="card-header">
                    <div class="custom-card-title">
                      <b><font-awesome-icon class="fa-xs" :icon="['fa', 'asterisk']"/></b>
                      <i style="color: #888">Please select a type and a brief note for your order(s)</i>
                      {{ order.type }}
                    </div>
                  </div>
                  <div class="card-content">

                    <div v-if="filteredCart.length === 0" class="has-text-centered no-data">
                      You have an empty cart, pick a product in the <b>Products</b> page :)
                    </div>

                    <div v-if="filteredCart.length > 0" v-for="(cart, index) in filteredCart" :key="cart._id" class="columns is-centered">
                      <div class="column card is-three-quarters">
                        <div class="card-content">
                          <div class="columns">
                            <div class="column">
                              <span class="tag"><b>#</b>{{ cart._id }}</span>
                            </div>
                            <div class="column has-text-right">
                              <b-tag class="is-medium title is-warning">
                                {{ cart.amount }}x
                              </b-tag>
                            </div>
                          </div>
                          <div class="columns">
                            <div class="column">
                              <code>Product Name:</code> {{ cart.name }} <br/>
                              <code>Product Price:</code> <b>{{ moneyFormat(cart.price) }}</b> <br/>
                              <code>Product Description:</code> {{ cart.description }}
                            </div>
                          </div>
                          <div class="columns is-centered">
                            <div class="column is-two-fifths">
                              <b-field label="Note" label-position="on-border">
                                <b-input type="textarea" :id="`note${index}`"/>
                              </b-field>
                            </div>
                            <div class="column is-two-fifths">
                              <b-field label="Shoe type" label-position="on-border">
                                <b-select placeholder="Select a Shoe type" :id="`type${index}`">
                                  <option
                                    v-for="type in allTypes"
                                    :value="type._id"
                                    :key="type._id">
                                    {{ type.name }} (+ {{ moneyFormat(type.extraPrice) }})
                                  </option>
                                </b-select>
                              </b-field>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="card-footer">
                    <div class="card-footer-item">
                      <button class="button is-dark" @click="prevStep">
                        <font-awesome-icon :icon="['fa', 'chevron-left']"/>
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button class="button is-success" @click="nextStep">
                        Next &nbsp;
                        <font-awesome-icon :icon="['fa', 'chevron-right']"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-step-item>


          <b-step-item label="Checkout" :clickable="false">
            <div class="card">
              <div class="card-footer">
                <div class="card-footer-item">
                  <button class="button is-dark" @click="prevStep">
                    <font-awesome-icon :icon="['fa', 'chevron-left']"/>
                    Previous &nbsp;
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button class="button is-info" @click="nextStep">
                    Pay Order &nbsp;
                    <font-awesome-icon :icon="['fa', 'arrow-right']"/>
                  </button>
                </div>
              </div>
            </div>
          </b-step-item>
        </b-steps>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Cart',
  data () {
    return {
      activeStep: 0,
      customer: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      allProducts: [],
      allTypes: null,
      currentCart: [],
      filteredCart: [],
      order: {
        type: ''
      }
    }
  },
  computed: mapState(['types', 'products', 'cart', 'types', 'checkout']),
  mounted () {
    this.fillProfile()

    let cart = this.$store.getters.cart
    this.currentCart = cart.content.map(el => el)
    this.allProducts = this.$store.getters.products
    this.allTypes = this.$store.getters.types

    this.filterOrders()

    console.log(this.currentCart)
    console.log(this.filteredCart)
  },
  watch: {
    'checkout.step': {
      handler (val) {
        this.activeStep = val
      }, deep: true
    },
    'checkout.profile': {
      handler (val) {
        this.customer = val
      }, deep: true
    },
    'cart.content': {
      handler (val) {
        this.currentCart = val
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
    fillProfile () {
      let step = this.$store.getters.checkout.step
      let profile = this.$store.getters.checkout.profile

      if (profile !== null) {
        this.activeStep = step

        this.customer.name = (profile.hasOwnProperty('name')) ? profile.name : ''
        this.customer.email = (profile.hasOwnProperty('email')) ? profile.email : ''
        this.customer.phone = (profile.hasOwnProperty('phone')) ? profile.phone : ''
        this.customer.address = (profile.hasOwnProperty('address')) ? profile.address : ''
      }
    },
    filterOrders () {
      this.currentCart.forEach(cart => {
        let order = this.allProducts.find(el => el._id === cart.productId)
        if (order) {
          let objData = JSON.parse(JSON.stringify(order))
          let obj = {
            _id: objData._id,
            name: objData.name,
            description: objData.description,
            duration: objData.duration,
            price: objData.price,
            amount: cart.amount
          }
          this.filteredCart.push(obj)
        }
      })
    },
    clearProfile () {
      let cust = this.customer

      if (cust.name !== '' && cust.email !== '' && cust.phone !== '' && cust.address !== '') {
        this.$buefy.dialog.confirm({
          title: 'Clear Profile',
          message: `Are you sure you want to clear out your information? This action cannot be undone`,
          confirmText: 'Yes, clear all',
          type: 'is-warning',
          hasIcon: true,
          icon: 'info-circle',
          iconPack: 'fas',
          size: 'is-small',
          onConfirm: () => {
            this.$store.dispatch('setCheckout', {
              step: 0,
              profile: {
                name: '',
                email: '',
                phone: '',
                address: ''
              }
            })
          }
        })
      }
    },
    nextStep () {
      let cust = this.customer

      if (this.activeStep < 2) {
        switch (this.activeStep) {
          case 0:
            if (cust.name !== '' && cust.email !== '' && cust.phone !== '' && cust.address !== '') {
              this.$store.dispatch('setCheckout', {
                step: 1,
                profile: {
                  name: cust.name,
                  email: cust.email,
                  phone: cust.phone,
                  address: cust.address
                }
              })
            } else {
              this.$buefy.toast.open({
                duration: 3000,
                message: 'All fields cannot be empty',
                position: 'is-bottom',
                type: 'is-warning'
              })
            }
            break;
          case 1:

            break;
          case 2:

            break;
        }
      }
    },
    prevStep () {
      if (this.activeStep !== 0) {
        let step = this.activeStep - 1

        this.$store.dispatch('setCheckout', {
          step: step
        })
      }
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

<style>
.step-items {
  margin-left: 0 !important;
}
ul.step-items {
  list-style-type: none !important;
}
</style>

<style scoped>
.content {
  padding: 0 40px 0 40px;
}
.custom-card-title {
  padding: .75rem;
  font-style: oblique;
  text-align: center;
  width: 100%;
}
.field {
  margin-bottom: 30px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}
input[type=number] {
  -moz-appearance:textfield !important;
}
.modal {
  z-index: 9999 !important;
}
.no-data {
  color: #aaa;
  font-style: italic;
  padding: 100px 0 100px 0;
}
.content {
  padding: 0 40px 100px 40px;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>

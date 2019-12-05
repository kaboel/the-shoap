<template>
  <section class="content">
    <div class="loading"
         v-if="allProducts == null">
      Loading...
    </div>

    <div v-if="allProducts != null && allProducts.length > 0">
      <div class="title is-size-4">
        Our Services
      </div>
      <div class="columns is-centered" style="margin-top: 30px">
        <div class="column is-one-quarter" v-for="product in allProducts.slice(0, 4)" :key="product._id">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">
                {{ product.name }} &nbsp;
                <span class="tag is-dark">{{ moneyFormat(product.price) }}</span> &nbsp;
                <span class="tag count is-warning"
                      v-if="getAmount(product._id) > 0">
                  x{{ getAmount(product._id) }}
                </span>
              </div>
            </div>
            <div class="card-content has-text-centered">
              <p>
                <span class="subtitle is-size-5">{{ product.description }}</span>
              </p>
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
                <button v-if="getAmount(product._id) > 0" class="button is-danger" @click="removeFromCart(product._id)">
                  <font-awesome-icon :icon="['fa', 'minus']"/>
                </button>
                &nbsp;&nbsp;&nbsp;
                <button class="button is-primary" @click="addToCart(product._id)">
                  <font-awesome-icon :icon="['fa', 'cart-plus']"/>
                  &nbsp;&nbsp;Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="allProducts.length > 4" class="columns is-centered">
        <div class="column is-one-quarter" v-for="product in allProducts.slice(4, 8)" :key="products._id">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">
                {{ product.name }} &nbsp;
                <span class="tag is-dark">{{ moneyFormat(product.price) }}</span> &nbsp;
                <span class="tag count is-warning"
                      v-if="getAmount(product._id) > 0">
                  x{{ getAmount(product._id) }}
                </span>
              </div>
            </div>
            <div class="card-content has-text-centered">
              <p>
                <span class="subtitle is-size-5">{{ product.description }}</span>
              </p>
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
                <button v-if="getAmount(product._id) > 0" class="button is-danger" @click="removeFromCart(product._id)">
                  <font-awesome-icon :icon="['fa', 'minus']"/>
                </button>
                &nbsp;&nbsp;&nbsp;
                <button class="button is-primary" @click="addToCart(product._id)">
                  <font-awesome-icon :icon="['fa', 'cart-plus']"/>
                  &nbsp;&nbsp;Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="allProducts.length > 8" class="columns is-centered">
        <div class="column is-one-quarter" v-for="product in allProducts.slice(8, 12)" :key="products._id">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">
                {{ product.name }} &nbsp;
                <span class="tag is-dark">{{ moneyFormat(product.price) }}</span> &nbsp;
                <span class="tag count is-warning"
                      v-if="getAmount(product._id) > 0">
                  x{{ getAmount(product._id) }}
                </span>
              </div>
            </div>
            <div class="card-content has-text-centered">
              <p>
                <span class="subtitle is-size-5">{{ product.description }}</span>
              </p>
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
                <button v-if="getAmount(product._id) > 0" class="button is-danger" @click="removeFromCart(product._id)">
                  <font-awesome-icon :icon="['fa', 'minus']"/>
                </button>
                &nbsp;&nbsp;&nbsp;
                <button class="button is-primary" @click="addToCart(product._id)">
                  <font-awesome-icon :icon="['fa', 'cart-plus']"/>
                  &nbsp;&nbsp;Add To Cart
                </button>
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
  name: 'Products',
  data () {
    return {
      allProducts: null,
      currentCart: []
    }
  },
  computed: mapState(['products', 'cart']),
  watch: {
    'products': {
      handler (val) {
        this.allProducts = val
      }, deep: true
    },
    'cart.content': {
      handler (val) {
        this.currentCart = val
      }, deep: true
    }
  },
  mounted() {
    let cart = this.$store.getters.cart
    this.currentCart = cart.content.map(el => el);
  },
  created() {
    this.loadProducts()
  },
  methods: {
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

    addToCart (productId) {
      let cart = this.currentCart

      if (this.currentCart.length === 0) {
        cart.push({
          productId: productId,
          amount: 1
        })
      } else {
        let indexRes = null;
        cart.some((el, index) => {
          if (el.productId === productId) {
            indexRes = index
          }
        })

        if (indexRes != null) {
          cart[indexRes].amount += 1
        } else {
          cart.push({
            productId: productId,
            amount: 1
          })
        }
      }
      this.$store.dispatch('addToCart', cart)
      this.$buefy.toast.open({
        duration: 1000,
        message: 'Added to cart',
        position: 'is-bottom',
        type: 'is-info'
      })
    },

    removeFromCart (productId) {
      let cart = this.currentCart
      cart.forEach((el, index) => {
        if (el.productId === productId) {
          cart[index].amount--
        }
      })
      this.$store.dispatch('addToCart', cart)
      this.$buefy.toast.open({
        duration: 1000,
        message: 'Removed from cart',
        position: 'is-bottom',
        type: 'is-danger'
      })
    },

    getAmount(id) {
      let data = this.currentCart.find(el => el.productId === id)
      if (data) {
        const objData = JSON.parse(JSON.stringify(data))
        return objData.amount
      }
    },

    moneyFormat (number) {
      return new Intl.NumberFormat('en-IDR', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      }).format(number);
    },
  }
}
</script>

<style scoped>
.count {
  color: #555
}
.content {
  padding: 0 40px 100px 40px;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
}
.card-content {
  min-height: 120px;
}
button.is-primary {
  background-color: #00a2ea !important;
}
</style>

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
<!--                <span class="tag count is-warning"-->
<!--                v-if="getAmount(product._id) !== null">-->
<!--                  x{{ getAmount(product._id) }}-->
<!--                </span>-->
              </div>
            </div>
            <div class="card-content">
              {{ product.description }}
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
                <button class="button is-primary" @click="addToCart(product._id)">
                  <font-awesome-icon :icon="['fa', 'cart-plus']"/>
                  &nbsp;&nbsp;Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-one-quarter" v-for="product in allProducts.slice(4, products.length)" :key="products._id">
          <div class="card">
            <div class="card-header">
              <p class="card-header-title">
                {{ product.name }} &nbsp;
                <span class="tag count is-warning"
                v-if="getAmount(product._id)">
                  x{{ getAmount(product._id) }}
                </span>
              </p>
            </div>
            <div class="card-content">
              {{ product.description }}
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
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
    products (newVal, oldVal) {
      this.allProducts = newVal
    },
    cart (newVal, oldVal) {
      this.currentCart = newVal
    }
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

      this.$store.dispatch('addToCart', cart);
    },

    getAmount(id) {
      const data = this.currentCart.find(el => el.productId === id)
      if (data) {
        const parsed = JSON.parse(JSON.stringify(data))
        return parsed.amount
      }
    },
  }
}
</script>

<style scoped>
.count {
  color: #555
}
.content {
  padding: 0 40px 0 40px;
}
.card-content {
  min-height: 120px;
}
button.is-primary {
  background-color: #00a2ea !important;
}
</style>

<template>
  <nav ref="navBar" class="navbar is-fixed-top is-spaced is-transparent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#" @click="contentOff">
        <img src="../../assets/logo.png" class="logo">
      </a>

      <div id="navbarBurger" class="navbar-burger burger"
           data-target="navbarMenu"
           @click="navToggle = !navToggle"
           :class="{'is-active' : navToggle}">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarMenu" class="navbar-menu" :class="{'is-active' : navToggle}">
      <div class="navbar-end">
<!--        <a @click="routeTo('About')" class="navbar-link is-arrowless">-->
<!--          About-->
<!--        </a>-->
        <a @click="routeTo('Products')" class="navbar-link is-arrowless">
          Products
        </a>
<!--        <a @click="routeTo('Contact')" class="navbar-link is-arrowless">-->
<!--          Contact-->
<!--        </a>-->
        <div class="navbar-item has-text-centered">
          <a @click="routeTo('Status')" class="button is-rounded is-outlined">
            <b>Check Status</b>
          </a>
        </div>
        <div class="navbar-item has-text-centered">
          <a @click="routeTo('Cart')" class="button is-rounded is-outlined has-badge-rounded has-badge-dark" v-bind:data-badge="total">
            <font-awesome-icon :icon="['fa', 'shopping-cart']" class="mr-sm fa-lg"/>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'TsNavbar',
  data () {
    return {
      navToggle: false,
      total: 0
    }
  },
  computed: mapState(['cart']),
  watch: {
    'cart.total': {
      handler (val) {
        this.total = val
      }, deep: true
    }
  },
  mounted() {
    let cart = this.$store.getters.cart
    this.total = cart.total
  },
  methods: {
    contentOff () {
      this.$store.dispatch('contentOff')
    },
    routeTo (page) {
      this.$store.dispatch('routeTo', page)
    }
  }
}
</script>

<style scoped>
.navbar {
  background: transparent !important;
  padding: 25px 50px 25px 50px;
  z-index: 9;
}
.button.is-outlined {
  color: #00a2ea !important;
  transition: all .2s ease-in-out;
}
.button {
  border: 0 !important;
}
.button:hover,
.button:focus
{
  background-color: #00a2ea !important;
  color: #ddd !important
}
.logo {
  width: 100px !important;
  max-height: 200px !important;
}
@media(max-width: 1024px) {
  .navbar-menu.is-active {
    background-color: #f6f6f6 !important;
    border-top: 0;
    border-bottom: 1px;
    border-left: 0px;
    border-right: 0px;
    border-style: solid;
    border-bottom-right-radius: 2rem;
    border-bottom-left-radius: 2rem;
    border-color: #ddd;
    padding-left: .5rem !important;
    padding-right: .5rem !important;
    padding-bottom: 1rem !important;
  }
  .navbar-burger.is-active {
    background-color: #f6f6f6 !important;
  }
  .navbar-menu.is-active a.navbar-item:hover,
  .navbar-menu.is-active a.navbar-link:hover {
    background-color: initial;
    color: #0A0A0A;
  }
}
</style>

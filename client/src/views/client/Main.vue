<template>
  <div>
    <ts-navbar/>
    <video autoplay muted loop class="bg-video">
      <source src="../../assets/sepatu.mp4" type="video/mp4">
    </video>

    <div class="columns greetings">
      <div class="column">
        <p>
          <span class="subtitle is-size-2 has-text-white">Welcome To</span> <br/>
          <span class="title is-size-large has-text-primary">Sepatu Bersih</span>
        </p>
        <br/>
        <p class="subtitle has-text-primary">
          <span class="is-size-4">Shoe Laundry</span> <br/>
          <span class="is-size-5">Est. 1000 A.D</span>
        </p>
      </div>
    </div>

    <div v-if="contentActive" class="overlay"></div>

    <div v-if="contentActive" class="content-bar">
      <div class="content-bar-header">
        <a class="exit-btn" href="#" @click="$store.dispatch('contentOff')">
          <font-awesome-icon :icon="['fas', 'times']"/>
        </a>
      </div>
      <div class="content-bar-content">
        <About v-if="pageActive === 'About'"/>
        <Products v-if="pageActive === 'Products'"/>
        <Contact v-if="pageActive === 'Contact'"/>
        <Status v-if="pageActive === 'Status'"/>
        <Cart v-if="pageActive === 'Cart'"/>
      </div>
    </div>

    <div class="footer">
      <font-awesome-icon :icon="['fa', 'copyright']"/> 2014 <span style="font-weight: lighter; color: #ddd">The Mastej Studio</span> <br/>
      Beautified by <code>Kodeskillet</code>
    </div>
  </div>
</template>

<script>
import api from '../../service/api'
import {mapState, mapActions} from 'vuex'
import About from './About'
import Products from './Products'
import Contact from './Contact'
import TsNavbar from '../../components/client/TsNavbar'
import Cart from './Cart'
import Status from './Status'

export default {
  name: 'ClientMain',
  components: {Status, Cart, TsNavbar, Contact, Products, About},
  data () {
    return {
      contentActive: false
    }
  },
  computed: mapState(['contentOn', 'pageActive', 'orders', 'products', 'types']),
  watch: {
    contentOn (newVal, oldVal) {
      this.contentActive = newVal
    }
  },
  mounted () {
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
  }
}
</script>

<style scoped>
.overlay {
  background-color: rgba(0,0,0,0.6);
  position: fixed;
  min-height: 100%;
  min-width: 100%;
  z-index: 5;
}
.bg-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
.greetings {
  text-align: center;
  position: fixed;
  width: 100%;
  min-height: 100vh;
}
.greetings .column {
  padding-top: 35vh
}
.is-size-large {
  font-size: 6rem;
}
.content-bar {
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 83.5%;
  max-height: 83.5%;
  z-index: 99;
  background-color: #eee;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  transition: all .2s ease-in-out;
}
.content-bar-header {
  padding: 15px 30px 0 30px;
  text-align: right;
}
.exit-btn {
  font-size: 1.3rem;
  color: #fb4444;
}
</style>

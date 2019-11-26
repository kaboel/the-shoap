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
          <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
        </a>
      </div>
      <div class="content-bar-content">
        <About v-if="pageActive === 'About'"/>
        <Products v-if="pageActive === 'Products'"/>
        <Contact v-if="pageActive === 'Contact'"/>
      </div>
    </div>

    <div class="footer">
      <font-awesome-icon :icon="['fa', 'copyright']"></font-awesome-icon> 2014 <span style="font-weight: lighter; color: #ddd">The Mastej Studio</span> <br/>
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

export default {
  name: 'Index',
  components: {TsNavbar, Contact, Products, About},
  data () {
    return {
      products: {},
      contentActive: false
    }
  },
  computed: mapState(['contentOn', 'pageActive']),
  watch: {
    contentOn (newVal, oldVal) {
      this.contentActive = newVal
    },
    getAllProducts (newVal, oldVal) {
      this.products = newVal
    }
  },
  mounted () {
    this.loadProducts()
  },
  methods: {
    async loadProducts () {
      await api.getAllProduct().then(res => {
        this.products = res.data
      }).catch(err => {
        console.log(err)
      })
    }
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

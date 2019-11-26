<template>
  <div>
    <video autoplay muted loop class="bg-video">
      <source src="../../assets/sepatu.mp4" type="video/mp4">
    </video>

    <div class="columns greetings">
      <div class="column">
        <p>
          <span class="subtitle is-size-2 has-text-white">Welcome To</span> <br/>
          <span class="title is-size-large has-text-primary">The Shoap</span>
        </p>
        <br/>
        <p class="subtitle has-text-primary">
          <span class="is-size-4">Shoe Laundry</span> <br/>
          <span class="is-size-5">Est. 1000 A.D</span>
        </p>
      </div>
    </div>

    <div v-if="contentOn" class="overlay"></div>

    <div v-if="contentOn" class="bottom-bar">
      <About v-if="pageActive === 'About'"/>
      <Products v-if="pageActive === 'Products'"/>
      <Contact v-if="pageActive === 'Contact'"/>
    </div>

    <div class="footer">
      &copy; 2019 Kodeskillet
    </div>
  </div>
</template>

<script>
import api from '../../service/api'
import {mapState} from 'vuex'
import About from "./About";
import Products from "./Products";
import Contact from "./Contact";

export default {
  name: 'Index',
  components: {Contact, Products, About},
  data () {
    return {
      products: {},
    }
  },
  computed: mapState(['contentOn', 'pageActive']),
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
.bottom-bar {
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 82.5%;
  z-index: 99;
  background-color: #eee;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  transition: all .2s ease-in-out;
}
</style>

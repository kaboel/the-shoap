<template>
  <div>
    <div class="overlay">
      <video autoplay muted loop class="overlay-video">
        <source src="../../assets/sepatu.mp4"/>
      </video>

      <div class="columns greetings">
        <div class="column">
          <p class="subtitle is-size-2 has-text-white">Welcome To</p>
          <p class="title is-size-large has-text-primary">The Shoap</p>
          <br/>
          <p class="subtitle has-text-primary">
            <span class="is-size-4">Shoe Laundry</span> <br/>
            <span class="is-size-5">Est. 2222</span>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from '../../service/api'

export default {
  name: 'Index',
  data () {
    return {
      products: {}
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
  position: relative;
  width: 100%;
  overflow: hidden;
}
.overlay-video {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100%;
  min-height: 100%;
}
.greetings {
  text-align: center;
  position: relative;
  width: 100%;
  min-height: 100vh;
}
.greetings .column {
  padding-top: 35vh
}
.is-size-large {
  font-size: 5rem;
}
</style>

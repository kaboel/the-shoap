<template>
  <div>
    <video autoplay muted loop class="overlay-video">
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
.overlay-video {
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
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import api from './service/api'

export default {
  name: 'App',
  mounted () {
    this.loadProducts()
    this.loadTypes()
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

    async loadTypes () {
      await api.type.getAllTypes().then(res => {
        this.$store.dispatch('fillTypes', res.data)
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

<style>
#app {
  overflow: hidden !important;
}
.has-text-primary {
  color: #00a2ea !important;
}
a.navbar-link {
  color: #aaa !important
}
a.navbar-link:hover {
  color: #00a2ea !important;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  text-align: center;
  color: #00a2ea;
  padding: 50px;
  font-weight: bold;
  font-size: .8rem;
  background-color: transparent;
}
code {
  background-color: transparent;
  color: #ff3860;
  font-size: 1em !important;
  font-weight: 400;
  padding: .25em .5em .25em;
}
.loading {
  width: 100%;
  min-height: 75vh;
  line-height: 75vh;
  font-size: 1.4rem;
  font-weight: bolder;
  color: #aaa;
  text-align: center;
}
</style>

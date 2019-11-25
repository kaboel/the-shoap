<template>
  <div id="app">
    <ts-navbar/>
    <router-view/>
  </div>
</template>

<script>
import TsNavbar from './components/client/TsNavbar'

export default {
  name: 'App',
  components: {TsNavbar}
}
</script>

<style>
.has-text-primary {
  color: #00a2ea !important
}
</style>

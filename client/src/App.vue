<template>
  <div id="app">
    <ts-navbar/>
    <router-view/>
  </div>
</template>

<script>
import TsNavbar from './components/client/TsNavbar'
import About from './views/client/About'

export default {
  name: 'App',
  components: {About, TsNavbar}
}
</script>

<style>
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
  font-style: oblique;
  background-color: transparent;
}
</style>

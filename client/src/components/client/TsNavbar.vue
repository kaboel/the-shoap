<template>
  <nav class="navbar is-fixed-top is-spaced is-transparent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
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
        <a href="/about" class="navbar-link is-arrowless">
          About
        </a>
        <a href="#projects" class="navbar-link is-arrowless">
          Products
        </a>
<!--        <a href="#projects" class="navbar-link is-arrowless">-->
<!--          Store-->
<!--        </a>-->
        <a href="#projects" class="navbar-link is-arrowless">
          Contact
        </a>
        <div class="navbar-item has-text-centered">
          <router-link class="button is-rounded is-outlined" to="/contact">
            <font-awesome-icon :icon="['fas', 'envelope']" class="mr-sm fa-lg"></font-awesome-icon>
            <b>Check Status</b>
          </router-link>
        </div>
        <div class="navbar-item has-text-centered">
          <router-link class="button is-rounded" to="/contact">
            <font-awesome-icon :icon="['fas', 'envelope']" class="mr-sm fa-lg"></font-awesome-icon>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TsNavbar'
}
</script>

<style scoped>
.navbar {
  background: transparent !important;
  padding: 25px 50px 25px 50px;
}
html:not([data-scroll='0']) {
  .navbar {
    background-color: initial;
  }
}
.button.is-outlined {
  color: #00a2ea !important;
  transition: all .2s ease-in-out;
}
.button {
  border: 0 !important;
  opacity: 0.6;
}
.button:hover,
.button:focus
{
  opacity: 1;
  background-color: #00a2ea !important;
  color: #ddd !important
}
.logo {
  width: 100px !important;
  max-height: 200px !important;
}
</style>

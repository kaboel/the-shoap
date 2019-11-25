<template>
  <nav class="navbar is-fixed-top is-spaced is-transparent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        Shoap
<!--        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Faiq Allam | A Code Junkie, and Full Stack Web Developer">-->
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
        <a href="#about" class="navbar-link is-arrowless">
          About Us
        </a>
        <a href="#projects" class="navbar-link is-arrowless">
          Products
        </a>
        <a href="#projects" class="navbar-link is-arrowless">
          Store
        </a>
        <a href="#projects" class="navbar-link is-arrowless">
          Contact
        </a>
        <div class="navbar-item has-text-centered">
          <router-link class="button is-rounded is-black is-outlined" to="/contact">
            <font-awesome-icon :icon="['fas', 'envelope']" class="mr-sm fa-lg"></font-awesome-icon>
            <b>Check Status</b>
          </router-link>
        </div>
        <div class="navbar-item has-text-centered">
          <router-link class="button is-rounded is-black is-outlined" to="/contact">
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
}
html:not([data-scroll='0']) {
  .navbar {
    background-color: initial;
  }
}
</style>

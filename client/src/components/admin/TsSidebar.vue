<template>
  <aside class="column is-2 is-fullheight">
    <p class="menu-label is-hidden-touch">Navigation</p>
    <ul class="menu-list">
      <li>
        <a @click="sectionTo('Products')" :class="{'is-active' : productsActive}">
          <font-awesome-icon :icon="['fa', 'boxes']"/> Products
        </a>
      </li>
      <li>
        <a @click="sectionTo('Types')" :class="{'is-active' : typesActive}">
          <font-awesome-icon :icon="['fa', 'list']"/> Types
        </a>
      </li>
      <li>
        <a @click="sectionTo('Orders')" :class="{'is-active' : ordersActive}">
          <font-awesome-icon :icon="['fa', 'info']"/> Orders
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "TsSidebar",
    data () {
      return {
        productsActive: true,
        typesActive: false,
        ordersActive: false
      }
    },
    computed: mapState(['sectionActive']),
    watch: {
      sectionActive (newVal, oldVal) {
        (newVal === 'Products') ? this.productsActive = true : this.productsActive = false;
        (newVal === 'Types') ? this.typesActive = true : this.typesActive = false;
        (newVal === 'Orders') ? this.ordersActive = true : this.ordersActive = false;
      }
    },
    methods: {
      sectionTo (section) {
        let store = this.$store;
        store.dispatch('sectionTo', section);
      }
    }
  }
</script>

<style scoped>

</style>

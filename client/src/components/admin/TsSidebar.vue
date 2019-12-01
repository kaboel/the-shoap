<template>
  <aside class="column is-2 is-fullheight">
    <p class="menu-label is-hidden-touch">Navigation</p>
    <ul class="menu-list">
      <li>
        <a @click="sectionTo({parent: 'Orders'})"
           :class="{'is-active' : activeSection.parent === 'Orders'}">
          <font-awesome-icon :icon="['fa', 'info']"/> Orders
        </a>

        <ul>
          <li>
            <a @click="sectionTo({parent: 'Orders', status: 'Complete'})"
               :class="{'is-active' : activeSection.status === 'Complete'}">
              <font-awesome-icon :icon="['fa', 'check']"/> Complete
            </a>
          </li>
          <li>
            <a @click="sectionTo({parent: 'Orders', status: 'In Queue'})"
               :class="{'is-active' : activeSection.status === 'In Queue'}">
              <font-awesome-icon :icon="['fa', 'sync-alt']"/> In Queue
            </a>
          </li>
        </ul>
      </li>

      <li>
        <a @click="sectionTo({parent: 'Products'})"
           :class="{'is-active' : activeSection.parent === 'Products'}">
          <font-awesome-icon :icon="['fa', 'boxes']"/> Products
        </a>

        <ul>
          <li>
            <a @click="sectionTo({parent: 'Products', child: 'New Product'})"
               :class="{'is-active' : activeSection.child === 'New Product'}">
              <font-awesome-icon :icon="['fa', 'plus-circle']"/> Add New
            </a>
          </li>
        </ul>
      </li>

      <li>
        <a @click="sectionTo({parent: 'Types'})"
           :class="{'is-active' : activeSection.parent === 'Types'}">
          <font-awesome-icon :icon="['fa', 'list']"/> Types
        </a>

        <ul>
          <li>
            <a @click="sectionTo({parent: 'Types', child: 'New Type'})"
               :class="{'is-active' : activeSection.child === 'New Type'}">
              <font-awesome-icon :icon="['fa', 'plus-circle']"/> Add New
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'TsSidebar',
  data () {
    return {
      activeSection: {
        parent: 'Products'
      }
    }
  },
  computed: mapState(['sectionActive']),
  watch: {
    sectionActive (newVal, oldVal) {
      this.activeSection = newVal
    }
  },
  methods: {
    sectionTo (section) {
      let store = this.$store
      store.dispatch('sectionTo', section)
    }
  }
}
</script>

<style scoped>

</style>

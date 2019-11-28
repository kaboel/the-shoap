<template>
  <div id="main">
    <div class="columns is-fullheight main-parent">
      <ts-sidebar/>
      <div class="container column is-10 box is-fullheight main-content">
        <nav class="breadcrumb is-right" aria-label="breadcrumbs">
          <ul>
            <li v-if="activeSection.parent !== ''"
                :class="{'is-active': !activeSection.hasOwnProperty('child')}">
              <a @click="$store.dispatch('sectionTo', {parent: activeSection.parent})">
                <font-awesome-icon :icon="['fa', 'boxes']" v-if="activeSection.parent === 'Products'"/>
                <font-awesome-icon :icon="['fa', 'list']" v-if="activeSection.parent === 'Types'"/>
                <font-awesome-icon :icon="['fa', 'info']" v-if="activeSection.parent === 'Orders'"/>
                &nbsp;
                {{ activeSection.parent }}
              </a>
            </li>
            <li v-if="activeSection.child !== ''" class="is-active">
              <a>{{ activeSection.child }}</a>
            </li>
          </ul>
        </nav>
        <div class="navbar-divider"/>
        <div class="content">
          <Product v-if="activeSection.parent === 'Products' && !activeSection.hasOwnProperty('child')"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TsSidebar from '../../components/admin/TsSidebar'
import {mapState} from 'vuex'
import Product from './Product'

export default {
  name: 'AdminMain',
  components: {Product, TsSidebar},
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
  }
}
</script>
<style scoped>
#main {
  min-height: 100%;
  height: 100%;
}
.main-parent {
  padding: 30px;
}
.main-content {
  padding: 0;
}
nav.breadcrumb {
  margin-bottom: 0 !important;
  padding: 10px 10px 0 20px
}
.box {
  height: 92.5vh !important;
}
.content {
  padding: 5px 20px 10px 20px;
}
</style>

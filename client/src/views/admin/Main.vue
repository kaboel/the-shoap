<template>
  <section id="main">
    <div class="columns is-fullheight main-parent">
      <ts-sidebar/>
      <div class="column is-10 box is-fullheight main-content">
        <nav class="breadcrumb is-right" aria-label="breadcrumbs">
          <ul>
            <li :class="{'is-active': !activeSection.hasOwnProperty('child')}">
              <a @click="$store.dispatch('sectionTo', {parent: activeSection.parent})">
                <font-awesome-icon :icon="['fa', 'boxes']" v-if="activeSection.parent === 'Products'"/>
                <font-awesome-icon :icon="['fa', 'list']" v-if="activeSection.parent === 'Types'"/>
                <font-awesome-icon :icon="['fa', 'info']" v-if="activeSection.parent === 'Orders'"/>
                &nbsp;
                {{ activeSection.parent }}
              </a>
            </li>
            <li v-if="activeSection.hasOwnProperty('status')" class="is-active">
              <a>
                {{ activeSection.status }}
              </a>
            </li>
            <li v-if="activeSection.hasOwnProperty('child')" class="is-active">
              <a>
                <span v-if="!activeSection.hasOwnProperty('id')">
                  {{ activeSection.child }}
                </span>
                <span class="tag is-small" v-if="activeSection.hasOwnProperty('id')">
                  <b>#</b>{{ activeSection.id }}
                </span>
              </a>
            </li>
            <li v-if="activeSection.hasOwnProperty('id')" class="is-active">
              <a>
                Invoice
              </a>
            </li>
          </ul>
        </nav>
        <div class="navbar-divider"/>
        <div class="content">
          <Product v-if="activeSection.parent === 'Products' && !activeSection.hasOwnProperty('child')"/>
          <AddProduct v-if="activeSection.parent === 'Products' && activeSection.child === 'New Product'"/>

          <Type v-if="activeSection.parent === 'Types' && !activeSection.hasOwnProperty('child')"/>
          <AddType v-if="activeSection.parent === 'Types' && activeSection.child === 'New Type'"/>

          <Order v-if="activeSection.parent === 'Orders' && !activeSection.hasOwnProperty('child') && !activeSection.hasOwnProperty('status')"/>
          <OrderComplete v-if="activeSection.parent === 'Orders' && activeSection.hasOwnProperty('status') && activeSection.status === 'Complete'"/>
          <OrderInQueue v-if="activeSection.parent === 'Orders' && activeSection.hasOwnProperty('status') && activeSection.status === 'In Queue'"/>
          <OrderDetail v-if="activeSection.parent === 'Orders' && activeSection.hasOwnProperty('id')"/>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import TsSidebar from '../../components/admin/TsSidebar'
import {mapState} from 'vuex'
import Product from './Product'
import AddProduct from './AddProduct'
import Type from './Type'
import AddType from './AddType'
import Order from './Order'
import OrderDetail from './OrderDetail'
import OrderComplete from './OrdersComplete'
import OrderInQueue from "./OrdersInQueue";

export default {
  name: 'AdminMain',
  components: {OrderInQueue, OrderComplete, OrderDetail, Order, AddType, Type, AddProduct, Product, TsSidebar},
  data () {
    return {
      activeSection: {
        parent: 'Orders'
      },
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
  background-color: #fbfbfb;
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

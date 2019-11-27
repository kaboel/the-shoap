<template>
  <div id="main">
    <div class="columns is-fullheight main-parent">
      <ts-sidebar/>
      <div class="container column is-10">
        
      </div>
    </div>
  </div>
</template>
<script>
import TsSidebar from "../../components/admin/TsSidebar";
import {mapState} from "vuex";
export default {
  name: 'AdminMain',
  components: {TsSidebar},
  data () {
    return {
      activeSection: 'Products'
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
</style>

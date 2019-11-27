<template>
  <div id="main">
    <div class="columns is-fullheight main-parent">
      <ts-sidebar/>
      <div class="container column is-10">
        yoloyolo
      </div>
    </div>
  </div>
</template>
<script>
import TsSidebar from "../../components/admin/TsSidebar";
export default {
  name: 'AdminMain',
  components: {TsSidebar}
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

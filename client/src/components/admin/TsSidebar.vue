<template>
  <aside class="column is-2 is-fullheight">
    <p class="menu-label is-hidden-touch">Navigation</p>
    <ul class="menu-list">
      <li>
        <a href="#" class="">
          <font-awesome-icon :icon="['fa', 'home']"/> Products
        </a>
      </li>
      <li>
        <a href="#" class="">
          <font-awesome-icon :icon="['fa', 'link']"/> Types
        </a>
      </li>
      <li>
        <a href="#" class="">
          <font-awesome-icon :icon="['fa', 'info']"/> Orders
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: "TsSidebar"
  }
</script>

<style scoped>

</style>

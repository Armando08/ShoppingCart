<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="logo-wrapper">
        <img src="../assets/logo.png" class="logo" />
      </div>
      <div class="action-wrapper">
        <favorites />
        <cart />
      </div>
    </div>
  </div>
</template>
<script>
import Favorites from './Favorites'
import Cart from './Cart'
export default {
  components: { Cart, Favorites },
  data() {
    return {}
  },
}
</script>

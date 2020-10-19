<template>
  <div class="header-wrapper">
    <div class="logo-wrapper">
      <h1 class="logo">Logo</h1>
    </div>
    <div class="action-wrapper">
      <favorites />
      <cart />
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

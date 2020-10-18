<template>
  <div class="header-wrapper">
    <div class="logo-wrapper">
      <h1 class="logo">Logo</h1>
    </div>
    <div class="action-wrapper">
      <favorites :favorites="favoriteList" />
      <cart :cart="cartList" />
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
  props: {
    favoriteList: {
      type: Array,
      required: true,
    },
    cartList: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log(this.favoriteList)
  },
}
</script>

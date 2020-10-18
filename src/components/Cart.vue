<template>
  <div class="cart">
    <div class="badge" v-if="this.cart.length > 0">{{ this.cart.length }}</div>
    <div class="total">€ {{ this.total.toFixed(2) }}</div>
    <img
      src="../assets/svg/shopping-basket-solid.svg"
      alt="favorites"
      class="icon-size"
    />
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      total: 0,
    }
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  watch: {
    cart() {
      this.total = this.cart.reduce(
        (total, item) => total + item.retail_price.value,
        0
      )
    },
  },
  mounted() {},
}
</script>

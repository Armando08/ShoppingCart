<template>
  <div>
    <div class="cart" @click="showDrawer()">
      <div class="badge" v-if="itemsQuantity > 0">
        {{ itemsQuantity }}
      </div>
      <img
        src="../assets/svg/shopping-cart-solid.svg"
        alt="favorites"
        class="icon-size"
      />
    </div>
    <div id="mySidenav" class="sidenav">
      <div class="cart-drawer-header">
        <div class="total-cart">
          Total: € {{ this.totalCartPrice.toFixed(2) }}
        </div>
        <div class="close-btn" @click="closeNav()">&times;</div>
      </div>
      <div class="cart-item-wrapper">
        <item-cart
          v-for="(cartItem, index) in cart"
          :key="index"
          :cart-item="cartItem"
          :index="index"
        />
        <div v-if="itemsQuantity === 0" class="empty-cart">
          <img src="../assets/cart.png" />
          <div>Your cart is empty 😞</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCart from '../components/ItemCart'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    ItemCart,
  },
  data() {
    return {}
  },
  methods: {
    showDrawer() {
      if (window.screen.width <= 575) {
        this.$el.getElementsByClassName('sidenav')[0].style.width = '320px'
        return
      }
      this.$el.getElementsByClassName('sidenav')[0].style.width = '400px'
    },
    closeNav() {
      this.$el.getElementsByClassName('sidenav')[0].style.width = '0px'
    },
  },
  computed: {
    ...mapGetters({
      cart: 'getCart',
      totalCartPrice: 'getCartPrice',
      itemsQuantity: 'getItemsQuantity',
    }),
  },
}
</script>

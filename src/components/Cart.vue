<template>
  <div>
    <div class="cart" @click="showDrawer()">
      <div class="badge" v-if="this.cart.length > 0">
        {{ this.cart.length }}
      </div>
      <!--      <div class="total">€ {{ this.total.toFixed(2) }}</div>-->
      <img
        src="../assets/svg/shopping-basket-solid.svg"
        alt="favorites"
        class="icon-size"
      />
    </div>
    <div id="mySidenav" class="sidenav">
      <span class="close-btn" @click="closeNav()">&times;</span>
      <item-cart
        v-for="(cartItem, index) in this.cart"
        :key="index"
        :cart-item="cartItem"
        :index="index"
        :totalItem="total"
      />
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
    return {
      total: 0,
      isItemInCart: false,
    }
  },
  methods: {
    showDrawer() {
      this.$el.getElementsByClassName('sidenav')[0].style.width = '400px'
    },
    closeNav() {
      this.$el.getElementsByClassName('sidenav')[0].style.width = '0px'
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart',
    }),
  }
}
</script>

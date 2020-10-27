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
        v-for="(cart, index) in this.cart"
        :key="index"
        :cart-item="cart"
        :index="index"
        :totalItem="total"
        @remove-item="removeItemFromCart(index)"
        @update-quantity="updateQuantity($event)"
      />
    </div>
  </div>
</template>

<script>
import ItemCart from '../components/ItemCart'
export default {
  name: 'Cart',
  components: {
    ItemCart,
  },
  data() {
    return {
      cart: [],
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
    },
    removeItemFromCart(index) {
      this.cart.splice(index, 1)
    },
    updateQuantity(item) {
      let total = 0

      this.cart.forEach((record, i) => {
        if (item.itemUUID === record.uuid) {
          this.cart[i].quantity ++
        }
        total = total + record.retail_price.value * this.cart[i].quantity
      })
      console.log(total)
      return (this.total = total)
    },
  },
  // watch: {
  //   cart() {
  //     this.total = this.cart.reduce(
  //       (total, item) => total + item.retail_price.value,
  //       0
  //     )
  //   },
  // },
  mounted() {
    this.$root.$on('addToCart', item => {
      this.isItemInCart = false
      this.cart.forEach((record, i) => {
        if (item.uuid === record.uuid) {
          this.isItemInCart = true
          this.cart[i].quantity++
        }
      })
      if (!this.isItemInCart) {
        this.cart.push(item)
      }
    })
  }
}
</script>

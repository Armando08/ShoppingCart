<template>
  <div class="cart-item" :id="index">
    <div class="image-side">
      <img class="cart-image" alt="fresh-garden" :src="itemImage" />
    </div>
    <div class="details-side">
      <div class="info-wrapper">
        <div class="name">{{ cartItem.title }}</div>
        <span class="price">€ {{ price }}</span>
        <div class="quantity">
          <span class="input-group-btn">
            <button
              class="quantity-buttons"
              type="button"
              :disabled="disableBtn"
              @click="decrementValue()"
              :style="disableBtn ? 'cursor: not-allowed' : ''"
            >
              <i>&#x2212;</i>
            </button>
          </span>
          <input
            class="quantity-input"
            type="number"
            v-model="cartItem.quantity"
            min="1"
            @input="updateQuantity($event)"
          />
          <span class="input-group-btn">
            <button
              class="quantity-buttons"
              data-type="plus"
              type="button"
              @click="incrementValue()"
            >
              <i>&#x2b;</i>
            </button>
          </span>
        </div>
      </div>
      <div class="item-action-wrapper">
        <span class="total-item">€ {{ totalItemPrice }}</span>
        <div class="remove-item" @click="removeItem()">
          <span>&times;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disableBtn: true,
      defaultImage: {
        width: 600,
        height: 500,
      },
    }
  },
  props: {
    cartItem: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  methods: {
    incrementValue() {
      this.$store.dispatch('updateCart', {
        item: this.cartItem,
        quantity: this.cartItem.quantity + 1,
      })
      if (this.cartItem.quantity >= 1) {
        this.disableBtn = false
      }
    },
    decrementValue() {
      this.$store.dispatch('updateCart', {
        item: this.cartItem,
        quantity: this.cartItem.quantity - 1,
      })
      if (this.cartItem.quantity <= 1) {
        this.disableBtn = true
      }
    },
    removeItem() {
      this.$store.dispatch('removeFromCart', this.cartItem)
    },

    updateQuantity() {
      this.$store.dispatch('updateCart', {
        item: this.cartItem,
        quantity: parseInt(
          /^[0,-]/.test(this.cartItem.quantity) ? 1 : this.cartItem.quantity
        )
      })
    }
  },
  computed: {
    itemImage() {
      return (
        this.cartItem.coverImageUrl +
        `?q=${60}&fit=crop&w=${this.defaultImage.width}&h=${
          this.defaultImage.height
        }`
      )
    },
    price() {
      return parseFloat(this.cartItem.retailPrice.value).toFixed(2)
    },
    totalItemPrice() {
      return (this.cartItem.quantity * this.cartItem.retailPrice.value).toFixed(
        2
      )
    },
  }
}
</script>

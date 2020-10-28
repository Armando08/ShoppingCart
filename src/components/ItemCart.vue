<template>
  <div class="cart-item" :id="index">
    <div class="image-side">
      <img class="cart-image" alt="fresh-garden" :src="itemImage" />
    </div>
    <div class="details-side">
      <div class="info-wrapper">
        <div class="name">{{ cartItem.title }}</div>
        <!--        <span class="price"-->
        <!--          >€ {{ cartItem.retail_price.value.toFixed(2) }}</span-->
        <!--        >-->
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
        <span class="total-item">{{(cartItem.quantity * cartItem.retail_price.value).toFixed(2) }}</span>
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
      counter: 1,
      disableBtn: false,
      defaultImage: {
        width: 70,
        height: 70,
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
    }
  },
  methods: {
    incrementValue() {
      this.$store.dispatch('updateCart', {
        item: this.cartItem,
        quantity: this.cartItem.quantity + 1,
      })
    },
    decrementValue() {
      this.$store.dispatch('updateCart', {
        item: this.cartItem,
        quantity: this.cartItem.quantity - 1,
      })
    },
    removeItem() {
      this.$emit('remove-item')
    }
  },
  computed: {
    itemImage() {
      return (
        this.cartItem.cover_image_url +
        `?q=${60}&fit=crop&w=${this.defaultImage.width}&h=${
          this.defaultImage.height
        }`
      )
    },
  },
  mounted() {
    this.counter = this.cartItem.quantity
  }
}
</script>

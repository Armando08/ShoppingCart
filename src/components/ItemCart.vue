<template>
  <div class="cart-item" :id="index">
    <div class="image-side">
      <img class="cart-image" alt="fresh-garden" :src="itemImage" />
    </div>
    <div class="details-side">
      <div class="info-wrapper">
        <div class="name">{{ cartItem.title }}</div>
        <span class="price"
          >€ {{ cartItem.retail_price.value.toFixed(2) }}</span
        >
        <div class="quantity">
          <span class="input-group-btn">
            <button
              class="quantity-buttons"
              type="button"
              :disabled="disableBtn"
              @click="decrementValue()"
              :style="disableBtn ? 'cursor: not-allowed': ''"
            >
              <i>&#x2212;</i>
            </button>
          </span>
          <input
            class="quantity-input"
            type="number"
            v-model="counter"
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
        <span class="total-item">{{ totalItemPrice }}</span>
        <div class="remove-item" @click="removeItem()"><span>&times;</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 1,
      disableBtn: this.cartItem.quantity <= 1,
      totalPrice: 0,
      defaultImage: {
        width: 70,
        height: 70,
      },
      totalItemPrice: 0
    }
  },
  props: {
    cartItem: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number
    },
    quantity:{
      required: true,
      type: Number
    }
  },
  methods: {
    incrementValue() {
      this.counter++
    },
    decrementValue() {
      this.counter--
      if (this.counter <= 1) {
        this.disableBtn = true
      }
    },
    removeItem() {
      this.$emit("remove-item")
    },
    setQuantity() {
      if (!this.quantity) {
        this.quantity++
      } else {
        this.quantity = this.counter
      }
      this.totalItemPrice = this.cartItem.retail_price.value * this.quantity
    },
    updateStore() {
      this.$root.$emit('update-quantity', {
        quantity: this.counter = /^[0,-]/.test(this.counter) ? 1 : this.counter,
        itemUUID: this.cartItem.uuid,
      })
    },
    // updateQuantity() {
    //   console.log('kot')
    //
    // }
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
    console.log(this.quantity)
    this.counter = this.quantity
  },
  watch: {
    counter() {
      alert(1)
      this.updateStore()
    }
  },
}
</script>

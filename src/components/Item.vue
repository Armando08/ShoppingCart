<template>
  <div class="product-card">
    <div class="image">
      <img :src="itemImage" />
    </div>
    <div class="details">
      <div class="title">{{ data.title }}</div>
      <div class="description">
        {{ description(data.description) }}
      </div>
      <div class="prices">
        <div class="final-price">
          {{ data.retailPrice.formatted_value }}
        </div>
        <div class="strike-price" v-if="data.discount > 0">
          <span> € {{ netPriceCalculation() }} </span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="add-to-cart">
        <button class="add-to-cart-btn" @click="addToCart(data)">
          <span> Add to cart </span>
          <img
            src="../assets/svg/cart-plus-solid.svg"
            alt="cart"
            class="cart-icon-size"
          />
        </button>
      </div>

      <div class="add-to-favorite">
        <span class="favorite-wrapper" @click="addToFavorite(data.uuid)">
          <img
            v-if="isAtFavorites(data)"
            src="../assets/svg/heart-solid.svg"
            alt="favorite"
            class="icon-size"
          />
          <img
            v-else
            src="@/assets/svg/heart-regular.svg"
            alt="favorite"
            class="icon-size"
          />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      defaultImage: {
        width: 600,
        height: 500,
      },
      netPrice: 0,
      hasFavorites: false,
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemImage() {
      return (
        this.data.coverImageUrl +
        `?q=${60}&fit=crop&w=${this.defaultImage.width}&h=${
          this.defaultImage.height
        }`
      )
    },
    ...mapGetters({
      favorites: 'getFavorites',
    }),
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch('addToCart', item)
    },
    addToFavorite(itemUUID) {
      this.$store.dispatch('setToFavorites', itemUUID)
    },
    isAtFavorites(item) {
      return this.favorites.findIndex(favorite => favorite === item.uuid) > -1
    },
    description(itemDescription) {
      if (!itemDescription) return 'No Description !'
      if (itemDescription.split('').length >= 70) {
        return `${itemDescription
          .split(' ')
          .slice(0, 15)
          .join(' ')}...`
      }
      return itemDescription
    },
    netPriceCalculation() {
      return (this.netPrice =
        this.data.retailPrice.value -
        (this.data.retailPrice.value * this.data.discount) / 100)
    },
  },
}
</script>

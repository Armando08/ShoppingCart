<template>
  <div class="product-card">
    <div class="image">
      <img :src="itemImage" />
    </div>
    <div class="details">
      <div class="title">{{ itemData.title }}</div>
      <div class="description">
        {{ description(itemData.description) }}
      </div>
      <div class="prices">
        <div class="final-price">
          {{ itemData.retail_price.formatted_value }}
        </div>
        <div class="strike-price" v-if="itemData.discount > 0">
          <span> € {{ netPriceCalculation() }} </span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="add-to-cart">
        <button class="add-to-cart-btn" @click="addToCart(itemData)">
          <span> Add to cart </span>
          <img
            src="../assets/svg/cart-plus-solid.svg"
            alt="cart"
            class="cart-icon-size"
          />
        </button>
      </div>

      <div class="add-to-favorite">
        <span class="favorite-wrapper" @click="addToFavorite(itemData)">
          <img
            v-if="isAtFavorites(itemData)"
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
    itemData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemImage() {
      return (
        this.itemData.cover_image_url +
        `?q=${60}&fit=crop&w=${this.defaultImage.width}&h=${
          this.defaultImage.height
        }`
      )
    },
    ...mapGetters({
      favorites: 'setToFavorites',
    }),
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch('addToCart', item)
    },
    addToFavorite(item) {
      this.$store.dispatch('setToFavorites', item.uuid)
    },
    isAtFavorites(item) {
      let exists = this.favorites.filter(
        selectedUUID => selectedUUID === item.uuid
      )
      return exists.length > 0
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
        this.itemData.retail_price.value -
        (this.itemData.retail_price.value * this.itemData.discount) / 100)
    },
  },
}
</script>

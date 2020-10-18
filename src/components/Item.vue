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
      <div class="add-to-favorite">
        <div class="favorite-wrapper" @click="addToFavorite(false)">
          <img
            v-if="addedToFavorite"
            src="../assets/svg/heart-solid.svg"
            alt="favorite"
            class="icon-size"
            :style="addedToFavorite ? 'cursor: not-allowed;' : ''"
          />
          <img
            v-else
            src="@/assets/svg/heart-regular.svg"
            alt="favorite"
            class="icon-size"
          />
        </div>
      </div>
      <div class="add-to-card">
        <div @click="addToCart()">
          <img
            src="../assets/svg/cart-plus-solid.svg"
            alt="favorite"
            class="icon-size"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultImage: {
        width: 600,
        height: 500,
      },
      netPrice: 0,
      addedToFavorite: false,
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
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.itemData)
    },
    addToFavorite(isClicked) {
      isClicked = true
      if (this.addedToFavorite) {
        return
      }
      this.$emit('addToFavorites', this.itemData)
      this.addedToFavorite = isClicked
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

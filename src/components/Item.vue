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
        <div class="favorite-wrapper" @click="addToFavorite(itemData)">
          <img
            v-if="itemData.isFavorites"
            src="../assets/svg/heart-solid.svg"
            alt="favorite"
            class="icon-size"
            :style="itemData.isFavorites ? 'cursor: not-allowed;' : ''"
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
        <div @click="addToCart(itemData)">
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
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      defaultImage: {
        width: 600,
        height: 500,
      },
      netPrice: 0,
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
      this.$root.$emit('addToCart', item)
    },
    addToFavorite(item) {
      this.$store.dispatch('setToFavorites', item)
      item.isFavorites = true
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
  mounted() {},
}
</script>

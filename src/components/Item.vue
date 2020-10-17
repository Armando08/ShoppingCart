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
        <div @mouseover="addToFavorite()">
          <img
            src="@/assets/svg/heart-regular.svg"
            alt="favorite"
            class="icon-size"
          />
        </div>
      </div>
      <div class="add-to-card">C</div>
    </div>

    <!--     
    <div>
      <span>{{ itemData.about }}</span>
      <img :src="itemImage" />
      <span>{{ itemData.retail_price.formatted_value }}</span>
      <span>{{ itemData.title }}</span>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
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
  },
  methods: {
    addToFavorite() {
      console.log('addedTofav')
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
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
}
</script>

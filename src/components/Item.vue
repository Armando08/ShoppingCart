<template>
  <div class="product-card">
    <div class="image">
      <img :src="itemImage" />
    </div>
    <div class="details">
      <div class="title">{{ itemData.title }}</div>
      <div class="description">{{ itemData.description }}</div>
    </div>
    <span class="border"></span>
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
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemImage() {
      return (
        this.itemData.cover_image_url + `?q=${60}&fit=crop&w=${500}&h=${300}`
      )
    },
  },
  mounted() {
    console.log(this.itemData, `Item data`)
  },
}
</script>

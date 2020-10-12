<template>
  <div class="item-wrapper">
    <div>
      <span>{{ itemData.about }}</span>
      <img :src="itemImage" />
      <span>{{ itemData.retail_price.formatted_value }}</span>
      <span>{{ itemData.title }}</span>
    </div>
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
        this.itemData.cover_image_url + `?q=${60}&fit=crop&w=${500}&h=${200}`
      )
    },
  },
  mounted() {
    console.log(this.itemData, `Item data`)
  },
}
</script>

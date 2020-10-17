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
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      photo: {
        width: 0,
        height: 0,
      },
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
        `?q=${60}&fit=crop&w=${this.photo.width}&h=${this.photo.height}`
      )
    },
  },
  methods: {
    addToFavorite() {
      console.log('addedTofav')
    },
    // TODO: REFACTOR in window width
    handleResize: function() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight

      if (
        (this.window.width > 320 && this.window.width < 575) ||
        this.window.width < 321
      ) {
        this.photo.height = 800
      } else if (this.window.width > 575 && this.window.width < 991) {
        this.photo.width = 500
        this.photo.height = 300
      } else if (this.window.width > 993 && this.window.width < 1200) {
        this.photo.height = 300
      } else if (this.window.width > 1200) {
        this.photo.height = 150
      }
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
}
</script>

<template>
  <div class="favorites">
    <div class="badge" v-if="this.favorites.length > 0">
      {{ this.favorites.length }}
    </div>
    <img
      src="../assets/svg/heart-solid.svg"
      alt="favorites"
      class="icon-size"
    />
  </div>
</template>

<script>
export default {
  name: 'Favorites',
  props: {
    favorites: {
      type: Array,
      required: true,
    },
  },
}
</script>

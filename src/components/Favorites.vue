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
import { mapGetters } from 'vuex'
export default {
  name: 'Favorites',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      favorites: 'getFavorites',
    }),
  },
}
</script>

<template>
  <div class="home">
    <app-header />
    <item />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import Item from '@/components/Item.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    Item,
  },
  data() {
    return {
      responseData: {},
    }
  },
  mounted() {
    fetch(
      'https://api.musement.com/api/v3/venues/164/activities?limit=10&offset=0',
      {
        method: 'GET',
        headers: {
          'accept-language': 'en',
          'content-type': 'application/json',
          'x-musement-currency': 'EUR',
          'x-musement-version': '3.4.0',
        },
      }
    )
      .then(response => response.json())
      .then(response => {
        this.responseData = response
      })
  },
}
</script>
<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  min-height: 100%;
  overflow: hidden;
}
</style>

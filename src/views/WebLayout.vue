<template>
  <div class="home">
    <app-header />
    <div class="container">
      <item v-for="item in this.itemData" :key="item.uuid" :itemData="item" />
      <pagination
        :total-pages="getTotalPages"
        :total="totalItems"
        :per-page="itemPerPage"
        :current-page="currentPage"
        @page-changed="onPageChange"
      />
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import Item from '../components/Item.vue'
import Pagination from '../components/Pagination'

export default {
  components: {
    Pagination,
    AppHeader,
    AppFooter,
    Item,
  },
  data() {
    return {
      responseData: [],
      itemData: [],
      currentPage: 1,
      itemPerPage: 6,
      totalItems: 0,
      window: {
        width: 0,
        height: 0,
      },
    }
  },
  methods: {
    onPageChange(page) {
      console.log(page)
      setTimeout(() => {
        this.currentPage = page
        this.fetchData()
      }, 500)
    },
    fetchData() {
      fetch(
        `https://api.musement.com/api/v3/activities?limit=${this.itemPerPage}&offset=${this.currentPage}`,
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
          this.totalItems = response.meta.count
          this.responseData = response.data
          this.itemData = this.responseData.map(item => ({
            uuid: item.uuid,
            discount: item.discount,
            description: item.description,
            title: item.title,
            cover_image_url: item.cover_image_url,
            retail_price: item.retail_price,
            isFavorites: false,
            quantity: 0,
          }))
        })
    },
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
  },
  computed: {
    getTotalPages() {
      return parseInt(Math.ceil(this.totalItems / this.itemPerPage))
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  mounted() {
    this.fetchData()
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

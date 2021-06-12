<template>
  <div class="home">
    <app-header @limit="fetchDataWithIconParam" />
    <div class="container">
      <item v-for="item in this.responseData" :key="item.uuid" :data="item" />
      <pagination
        :total-pages="totalPages"
        :total="totalItems"
        :per-page="itemPerPage"
        :is-icon-clicked="isClickFromIcon"
        :current-page="currentPage"
        @page-changed="onPageChange"
        @item-per-page="selectItemPerpage($event)"
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
      currentPage: 1,
      itemPerPage: 6,
      totalItems: 0,
      offset: 0,
      showComponent: false,
      isClickFromIcon: false,
    }
  },
  methods: {
    onPageChange(page) {
      this.offset = (page - 1) * this.itemPerPage
      this.currentPage = page
      this.fetchData()
      window.scrollTo(0, document.querySelector('body').scrollHeight)
    },
    selectItemPerpage(value) {
      this.itemPerPage = value
      this.fetchData()
    },
    fetchDataWithIconParam(param) {
      this.fetchData(param)
    },
    fetchData(iconParam) {
      iconParam !== undefined
        ? (this.isClickFromIcon = true)
        : (this.isClickFromIcon = false)

      fetch(
        `https://api.musement.com/api/v3/activities?limit=${
          this.itemPerPage
        }&offset=${iconParam === undefined ? this.offset : iconParam}`,
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
          const apiResponse = response.data
          this.responseData = apiResponse.map(item => ({
            uuid: item.uuid,
            discount: item.discount,
            description: item.description,
            title: item.title,
            coverImageUrl: item.cover_image_url,
            retailPrice: item.retail_price,
            isFavorites: false,
            quantity: 1,
          }))
        })
    },
  },
  computed: {
    totalPages() {
      return parseInt(Math.ceil(this.totalItems / this.itemPerPage))
    },
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

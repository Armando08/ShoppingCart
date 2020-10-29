import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    favorites: [],
    selectedFavorites: [],
    cart: [],
    totalCartPrice: 0,
    itemsQuantity: 0,
  },
  mutations: {
    ADD_TO_CART(state, item) {
      const record = state.cart.find(product => product.uuid === item.uuid)
      if (!record) {
        state.cart.unshift(item)
      } else {
        record.quantity++
      }
    },
    SET_TO_FAVORITES(state, itemUUID) {
      let selectedIndex
      let exist = state.favorites.filter((selectedUUID, index) => {
        if (selectedUUID === itemUUID) {
          selectedIndex = index
          return true
        }
      })
      if (exist.length > 0) {
        state.favorites.splice(selectedIndex, 1)
      } else {
        state.favorites.push(itemUUID)
      }
    },
    UPDATE_CART(state, data) {
      const { item, quantity } = data
      let exist = state.cart.find(product => product.uuid === item.uuid)
      if (exist) {
        exist.quantity = quantity
      }
    },
    REMOVE_FROM_CART(state, data) {
      const index = state.cart.findIndex(added => added.uuid === data.uuid)
      state.cart.splice(index, 1)
      data.quantity = 1
    },

    TOTAL_CART(state) {
      state.totalCartPrice = state.cart.reduce((total, item) => {
        return total + item.retail_price.value * item.quantity
      }, 0)

      state.itemsQuantity = state.cart.reduce((quantity, item) => {
        return quantity + item.quantity
      }, 0)
    },
  },
  actions: {
    setToFavorites({ commit }, data) {
      commit('SET_TO_FAVORITES', data)
    },
    addToCart({ commit }, data) {
      commit('ADD_TO_CART', data)
      commit('TOTAL_CART', data)
    },
    updateCart({ commit }, data) {
      commit('UPDATE_CART', data)
      commit('TOTAL_CART', data)
    },
    removeFromCart({ commit }, data) {
      commit('REMOVE_FROM_CART', data)
      commit('TOTAL_CART', data)
    },
  },
  getters: {
    setToFavorites(state) {
      return state.favorites
    },
    getCart(state) {
      return state.cart
    },
    getCartPrice(state) {
      return state.totalCartPrice
    },
    getItemsQuantity(state) {
      return state.itemsQuantity
    },
  },
})

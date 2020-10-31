import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    favorites: [],
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
      let selectedIndex = state.favorites.findIndex(
        favorite => favorite === itemUUID
      )
      if (selectedIndex >= 0) {
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
    REMOVE_FROM_CART(state, item) {
      const index = state.cart.findIndex(added => added.uuid === item.uuid)
      state.cart.splice(index, 1)
      item.quantity = 1
    },

    TOTAL_CART(state) {
      state.totalCartPrice = state.cart.reduce((total, item) => {
        return total + item.retailPrice.value * item.quantity
      }, 0)

      state.itemsQuantity = state.cart.reduce((quantity, item) => {
        return quantity + item.quantity
      }, 0)
    },
  },
  actions: {
    setToFavorites({ commit }, item) {
      commit('SET_TO_FAVORITES', item)
    },
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item)
      commit('TOTAL_CART', item)
    },
    updateCart({ commit }, item) {
      commit('UPDATE_CART', item)
      commit('TOTAL_CART', item)
    },
    removeFromCart({ commit }, item) {
      commit('REMOVE_FROM_CART', item)
      commit('TOTAL_CART', item)
    },
  },
  getters: {
    getFavorites(state) {
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

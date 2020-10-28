import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorites: [],
    selectedFavorites: [],
    cart: [],
  },
  mutations: {
    ADD_TO_CART(state, item) {
      const record = state.cart.find(product => product.uuid === item.uuid)

      if (!record) {
        state.cart.push(item)
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
      let exist = state.cart.find(product  => product.uuid === item.uuid)
      if (exist) {
        exist.quantity = quantity
      }

    }
  },
  actions: {
    setToFavorites({ commit }, data) {
      commit('SET_TO_FAVORITES', data)
    },
    addToCart({ commit }, data) {
      commit('ADD_TO_CART', data)
    },
    updateCart({ commit }, data) {
      commit('UPDATE_CART', data)
    },
  },
  getters: {
    setToFavorites(state) {
      return state.favorites
    },
    getCart(state) {
      return state.cart
    },
  },
})

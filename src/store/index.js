import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorites: [],
    selectedFavorites: [],
  },
  mutations: {
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
  },
  actions: {
    setToFavorites({ commit }, data) {
      commit('SET_TO_FAVORITES', data)
    },
  },
  getters: {
    setToFavorites(state) {
      return state.favorites
    },
  },
})

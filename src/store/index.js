import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorites:[],
    selectedFavorites: []
  },
  mutations: {
    SET_FAVORITES(state, payload) {
      if (payload.isFavorites) {
        return
      }
      this.state.favorites.push(payload)
    },
  },
  actions: {
    setToFavorites({commit}, data) {
      commit('SET_FAVORITES', data)
    },
  },
  getters: {
    setToFavorites(state) {
      return state.favorites
    },
  },
})

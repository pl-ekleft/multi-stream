import searchYoutube from 'youtube-api-v3-search'

export default {
  namespaced: false,
  state: {
    selectVideoUrl: false,
    searchData: {},
    searchShadow: false,
  },
  mutations: {
    setSelectVideoUrl (state, payload) {
      state.selectVideoUrl = payload
    },
    setSearchData (state, payload) {
      state.searchData = payload
    },
    setShadow (state, payload) {
      state.searchShadow = payload
    },
    clearSelectVideoUrl (state) {
      state.selectVideoUrl = false
    },
  },
  actions: {
    setSelectVideoUrl ({ commit }, payload) {
      commit('setSelectVideoUrl', payload)
    },
    setShadow ({ commit }, payload) {
      commit('setShadow', payload)
    },
    clearSelectVideoUrl ({ commit }) {
      commit('clearSelectVideoUrl')
    },
    async search ({ commit }, payload) {
      commit('clearError')
      try {
        /**
         * TODO: Ключ (YouTube Data API v3) будет работать только на http://localhost:8080/
         * Для получения своего ключа используйте: https://console.developers.google.com/apis/dashboard
         **/
        const data = await searchYoutube('AIzaSyAOmRCB6nA7SR2_XnPR9XaGWpSyB-f7mrs', { q: payload, part: 'snippet', type: 'video', maxResults: 50 })
        commit('setSearchData', data)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', { text: 'Неизвестная ошибка', index: 'main' })
        commit('setLoading', false)
        throw error
      }
    },
  },
  getters: {
    getSelectVideoUrl (state) {
      return state.selectVideoUrl
    },
    getSearchData (state) {
      return state.searchData
    },
    getSearchShadow (state) {
      return state.searchShadow
    },
  },
}

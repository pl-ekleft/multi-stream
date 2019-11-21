import searchYoutube from 'youtube-api-v3-search'

export default {
  namespaced: false,
  state: {
    selectVideoUrl: false,
    searchData: {},
    searchShadow: false
  },
  mutations: {
    setSelectVideoUrl(state, payload) {
      state.selectVideoUrl = payload
    },
    setSearchData(state, payload) {
      state.searchData = payload
    },
    setShadow(state, payload) {
      state.searchShadow = payload
    },
    clearSelectVideoUrl(state) {
      state.selectVideoUrl = false
    }
  },
  actions: {
    setSelectVideoUrl({ commit }, payload) {
      commit('setSelectVideoUrl', payload)
    },
    setShadow({ commit }, payload) {
      commit('setShadow', payload)
    },
    clearSelectVideoUrl({ commit }) {
      commit('clearSelectVideoUrl')
    },
    async search({ commit }, payload) {
      commit('clearError')
      /**
       * TODO: Ключ (YouTube Data API v3) будет работать только на http://localhost
       * Для получения своего ключа используйте: https://console.developers.google.com/apis/dashboard
       **/
      let key = [] // <--- вставить свой ключ в виде строки, после:
      key.push('AIzaSyB82He') // <--- удалить
      key.push('oIjHAMwWQ-sC') // <--- удалить
      key.push('cnI8V6VqVXMarACA') // <--- удалить
      key = key.join('') // <--- удалить

      try {
        const data = await searchYoutube(key, { q: payload, part: 'snippet', type: 'video', maxResults: 50 })
        commit('setSearchData', data)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', { text: !key ? 'Ключ YouTube Data API v3 отсутствует!' : 'Неизвестная ошибка', index: 'main' })
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    getSelectVideoUrl(state) {
      return state.selectVideoUrl
    },
    getSearchData(state) {
      return state.searchData
    },
    getSearchShadow(state) {
      return state.searchShadow
    }
  }
}

import searchYoutube from 'youtube-api-v3-search'

export default {
  state: {
    selectVideoUrl: false,
    searchData: {},
    loading: false,
    error: ''
  },
  mutations: {
    setSelectVideoUrl (state, payload) {
      state.selectVideoUrl = payload
    },
    setSearchData (state, payload) {
      state.searchData = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearSelectVideoUrl (state) {
      state.selectVideoUrl = false
    },
    clearError (state) {
      state.error = ''
    }
  },
  actions: {
    setSelectVideoUrl ({commit}, payload) {
      commit('setSelectVideoUrl', payload);
    },
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    clearSelectVideoUrl ({commit}) {
      commit('clearSelectVideoUrl')
    },
    clearError ({commit}) {
      commit('clearError')
    },
    async search({commit}, payload) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const data = await searchYoutube('AIzaSyAOmRCB6nA7SR2_XnPR9XaGWpSyB-f7mrs',{q: payload, part:'snippet', type:'video', maxResults: 34});
        commit('setSearchData', data);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', {text: 'Неизвестная ошибка', index:'main'});
        commit('setLoading', false);
        //throw error
      }
    }
  },
  getters: {
    getSelectVideoUrl (state) {
      return state.selectVideoUrl
    },
    getSearchData (state) {
      return state.searchData
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}

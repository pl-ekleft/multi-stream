// параметры vuex (общая шина)
import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import search from './modules/search'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    search,
    menu
  }
})

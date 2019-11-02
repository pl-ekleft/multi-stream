export default {
  namespaced: true, // включаем собственно пространство имён
  state: {
    items: [
      {
        url: '/history',
        text: 'Показать историю'
      }
    ]
  },
  getters: {
    items(state) {
      return state.items
    }
  }
}

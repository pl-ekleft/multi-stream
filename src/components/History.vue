<template>
  <div class="wrapper">
    <h1>Локальное хранилище:</h1>
    <pre>{{ windows }}</pre>
  </div>
</template>

<script>
export default {
  name: 'History',
  components: {

  },
  data () {
    return {
      windows: {},
    }
  },
  created () {
    this.checkWindows()
  },
  methods: {
    checkWindows () {
      if (localStorage.windows !== null) { // проверяем наличие windows в localStorage
        this.windows = JSON.parse(localStorage.windows) // если найдено, то назначаем (предварительно переведя в объект)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  pre {
    font-size: 1.5em;
  }
  .wrapper {
    display: block;
    padding: 10px;
    box-sizing: border-box;
  }
</style>

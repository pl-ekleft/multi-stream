<template>
  <div id="app">
    <header class="header">
      <span class="guide" @click="toggleSidebar"></span>
      <router-link to="/" class="logo"></router-link>
      <nav class="nav">
        <span class="nav__item" @click="insertVideo">Тестовое видео</span>
        <span class="nav__item" @click="openError">Показать ошибку</span>
      </nav>
    </header>

    <Sidebar></Sidebar>

    <error-box index="main"></error-box>

    <router-view></router-view>
  </div>
</template>

<script>
  import { eventEmitter } from './main.js'
  import Sidebar from './components/Sidebar.vue'
  import Error from './components/Error.vue'

  export default {
    name: 'app',
    data() {
        return {

        }
    },
    components: {
        errorBox: Error,
        Sidebar
    },
    methods: {
        insertVideo () { // вставляем видео - тест
            eventEmitter.$emit('urlUpdated') // устанавливаем событие urlUpdated
        },
        openError () { // открываем ошибку - тест
            this.$store.dispatch('setError', {text: 'Пример общей ошибки', index:'main'})
        },
        toggleSidebar () {
            eventEmitter.$emit('sidebarStatus')
        }
    },
    created () {

    }
  }
</script>

<style lang="scss">
  html  {
    width: 100%;
    height: 100%;
    font-size: 10px;
    font-family: Roboto, Arial, sans-serif;
  }
  body {
    display: block;
    margin: 0;
    padding: 56px 0 0;
    width: 100%;
    min-height: 100%;
    color: rgba(255, 255, 255, 0.88);
    box-sizing: border-box;
    background-color: #131313;
  }
  .btn {
    padding: 10px 16px;
    color: hsla(0, 0%, 6.7%, .6);
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: .007px;
    text-transform: uppercase;
    user-select: none;
    border: 0;
    border-radius: 2px;
    background-color: hsl(0, 0%, 93.3%);
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      cursor: default;
    }
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 36px;
    grid-auto-rows: minmax(100px, auto);
    padding: 10px 20px;
    width: 100%;
    height: 56px;
    font-size: 0;
    background: rgb(35, 35, 35);
    box-sizing: border-box;
    transform: translateY(0);
    transition: all .3s ease-in-out;
    overflow: hidden;
    z-index: 2020;
  }
  .logo {
    display: inline-block;
    grid-column: span 1;
    width: 56px;
    height: 36px;
    background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2024%2024%22%20xml%3Aspace%3D%22preserve%22%20fill%3D%22%23fff%22%3E%3Cpath%20d%3D%22M12%2C5c-3.9%2C0-7%2C3.1-7%2C7s3.1%2C7%2C7%2C7s7-3.1%2C7-7S15.9%2C5%2C12%2C5z%20M10%2C16V8l5.5%2C4L10%2C16z%20M20.3%2C19.3l-1.4-1.4%20%20c1.3-1.6%2C2.2-3.6%2C2.2-5.8s-0.8-4.3-2.2-5.8l1.4-1.4C22%2C6.7%2C23%2C9.2%2C23%2C12S22%2C17.3%2C20.3%2C19.3z%20M5.2%2C17.8l-1.4%2C1.4C2%2C17.3%2C1%2C14.8%2C1%2C12%20%20s1-5.3%2C2.7-7.3l1.4%2C1.4C3.8%2C7.7%2C3%2C9.8%2C3%2C12S3.8%2C16.3%2C5.2%2C17.8z%22%2F%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / 100% no-repeat;
  }
  .guide {
    display: none;
    /*display: inline-block;*/
    grid-column: span 1;
    width: 30px;
    height: 26px;
    background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2018%2015%22%20x%3D%220px%22%20y%3D%220px%22%20fill%3D%22%23fff%22%3E%3Cg%3E%3Cpath%20d%3D%22M1.5%2C3h15a1.5%2C1.5%2C0%2C0%2C0%2C0-3H1.5a1.5%2C1.5%2C0%2C0%2C0%2C0%2C3Z%22%2F%3E%3Cpath%20d%3D%22M16.5%2C6H1.5a1.5%2C1.5%2C0%2C0%2C0%2C0%2C3h15a1.5%2C1.5%2C0%2C0%2C0%2C0-3Z%22%2F%3E%3Cpath%20d%3D%22M16.5%2C12H1.5a1.5%2C1.5%2C0%2C0%2C0%2C0%2C3h15a1.5%2C1.5%2C0%2C0%2C0%2C0-3Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / contain no-repeat;
    cursor: pointer;
  }
  .nav {
    grid-column: span 11;
    display: flex;
    justify-content: flex-end;
    vertical-align: top;
    &__item {
      display: inline-block;
      padding: 10px 16px;
      color: hsla(0, 0%, 6.7%, .6);
      white-space: nowrap;
      font-size: 14px;
      font-weight: 500;
      line-height: normal;
      letter-spacing: .007px;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      user-select: none;
      border: 0;
      border-radius: 2px;
      background-color: hsl(0, 0%, 93.3%);
      & + & {
        margin-left: 12px;
      }
      &:hover {
        cursor: pointer;
      }
      &:disabled {
        cursor: default;
      }
    }
  }
</style>

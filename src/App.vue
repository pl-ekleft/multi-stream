<template>
  <div id="app">
    <header class="header">
      <router-link to="/" class="logo"></router-link>
      <span class="guide" @click="toggleSidebar"></span>
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
        toggleSidebar () {
            eventEmitter.$emit('sidebarShow')
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
    color: $rgba-255-88;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    width: 56px;
    height: 36px;
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      /*transition: background .3s ease-in-out;*/
      mask: url($icon-logo) 50% 50% / cover no-repeat;
      background: #f6f8f9;
      background: -moz-linear-gradient(top, #f6f8f9 0%, #e5ebee 50%, #d7dee3 51%, #f5f7f9 100%);
      background: -webkit-linear-gradient(top, #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%);
      background: linear-gradient(to bottom, #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6f8f9', endColorstr='#f5f7f9',GradientType=0 );
    }
  }
  .guide {
    display: inline-block;
    width: 30px;
    height: 26px;
    cursor: pointer;
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-color: $rgba-255;
      mask: url($icon-guide) 50% 50% / contain no-repeat;
    }
  }
</style>

<template>
  <div
    v-show="sidebarShowHold"
    class="sidebar"
  >
    <transition name="sidebar__wrapper-">
      <aside
        v-show="sidebarShow"
        class="sidebar__wrapper"
      >
        <div class="sidebar__header">
          <span
            class="guide"
            @click="toggleSidebar"
          />
        </div>
        <nav class="sidebar__content sidebar__content--scroll">
          <div class="sidebar-group">
            <div class="sidebar-group__title">
              Тестовый функционал
            </div>
            <div
              class="sidebar-group__item"
              @click="insertVideo"
            >
              <span>Показать тестовое видео</span>
            </div>
            <div
              class="sidebar-group__item"
              @click="openError"
            >
              <span>Показать ошибку</span>
            </div>
          </div>
        </nav>
        <nav class="sidebar__content sidebar__content--scroll">
          <div class="sidebar-group">
            <div class="sidebar-group__title">
              Управление хранилищем
            </div>
            <div
              class="sidebar-group__item"
              @click="removeWindowsInStorage"
            >
              <span>Удалить сохранённые данные</span>
            </div>
          </div>
        </nav>
        <nav
          v-if="false"
          class="sidebar__content sidebar__content--scroll"
        >
          <div class="sidebar-group">
            <div class="sidebar-group__title">
              Разделы меню
            </div>
            <!--<div class="sidebar-group__item" @click="toggleSidebar">-->
            <!--<router-link :to="{name: 'history'}">Показать историю</router-link>-->
            <!--</div>-->
            <router-link
              v-for="(item, key) in menuList"
              :key="key"
              :to="{name: 'history'}"
              tag="div"
              class="sidebar-group__item"
              active-class="active"
              @click.native="toggleSidebar"
            >
              <a>{{ item.text }}</a>
            </router-link>
          </div>
        </nav>
        <footer class="sidebar__footer">
          Ресурс позволяет пользователю одновременно просматривать несколько стримов или видео с YouTube и Twitch.
        </footer>
        <address class="sidebar__copyright">
          © 2019 Levin Pavel, MIT
        </address>
      </aside>
    </transition>
    <transition name="sidebar__shadow-">
      <div
        v-show="shadowShow"
        class="sidebar__shadow"
        @click="toggleSidebar"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { eventEmitter } from '../main.js'

export default {
  name: 'Sidebar',
  data () {
    return {
      sidebarShowHold: 0,
      sidebarShow: 0,
      shadowShow: 0,
    }
  },
  computed: {
    ...mapGetters('menu', {
      menuList: 'items',
    }),
  },
  watch: {
    sidebarShow () {
      if (this.sidebarShowHold) {
        setTimeout(() => {
          this.sidebarShowHold = !this.sidebarShowHold
        }, 200) // время равное времени transition
      } else {
        this.sidebarShowHold = !this.sidebarShowHold
      }
    },
  },
  created () {
    eventEmitter.$on('sidebarShow', () => { // Прослушиваем событие sidebarShow
      this.toggleSidebar()
    })
  },
  methods: {
    toggleSidebar () {
      this.sidebarShow = !this.sidebarShow
      this.shadowShow = !this.shadowShow

      if (this.sidebarShow) {
        document.querySelector('html').setAttribute('class', 'hide-scroll')
      } else {
        document.querySelector('html').removeAttribute('class')
      }
    },
    insertVideo () { // вставляем видео - тест
      eventEmitter.$emit('urlUpdate') // Вызываем событие urlUpdate
      this.toggleSidebar()
    },
    openError () { // открываем ошибку - тест
      this.$store.dispatch('setError', { text: 'Пример общей ошибки', index: 'main' })
      this.toggleSidebar()
    },
    removeWindowsInStorage () {
      eventEmitter.$emit('cleanUpdate') // Вызываем событие cleanUpdate
      this.toggleSidebar()
    },
  },
}
</script>

<style lang="scss">
  .hide-scroll {
    overflow: hidden;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 2022;
    &-group {
      padding: 8px 0;
      border-bottom: 1px solid $rgba-255-8;
      &__title {
        display: block;
        padding: 8px 24px;
        color: $rgba-255-60;
        font-size: 1.4rem;
        font-weight: 500;
        letter-spacing: .007px;
        text-transform: uppercase;
        a {
          color: inherit;
          text-decoration: none;
          &:hover {
            color: $rgba-255;
          }
        }
      }
      &__item {
        min-height: 40px;
        flex: 1;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        color: $rgba-255-94;
        font-size: 1.5rem;
        line-height: 3rem;
        > a, > span {
          padding: 0 24px;
          display: flex;
          flex-direction: row;
          align-items: center;
          min-height: 40px;

          cursor: pointer;
          box-sizing: border-box;
          outline: 0;
          color: inherit;
          text-decoration: none;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 2.1rem;
        }
        &:hover {
          background-color: $rgba-255-19;
          cursor: pointer;
        }
      }
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 10px 20px;
      width: 100%;
      height: 57px;
      border-bottom: 1px solid $rgba-255-8;
      box-sizing: border-box;
    }
    &__footer {
      padding: 24px 24px 0;
      color: hsl(0, 0%, 53.3%);
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 2.1rem;
      a {
        display: inline-block;
        text-decoration: none;
        color: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        white-space: nowrap;
        &:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
    &__copyright {
      padding: 24px;
      color: hsl(0, 0%, 53.3%);
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 2.1rem;
    }
    &__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 90%;
      max-width: 256px;
      height: 100%;
      font-size: 1.5rem;
      line-height: 1.5rem;
      transition: transform 0.2s ease;
      transform: translate3d(0, 0, 0);
      /*transition: all 0.3s cubic-bezier(.65, .05, .36, 1);*/
      background-color: rgb(29, 29, 29);
      z-index: 2023;
      &--enter,
      &--leave-to {
        transition: transform 0.2s ease;
        transform: translate3d(100%, 0, 0);
        /*right: -100%;*/
        /*transition: all 0.3s cubic-bezier(.65, .05, .36, 1);*/
      }
    }
    &__content {
      max-height: calc(100% - 56px);
      &--scroll {
        overflow-y: auto;
        overflow-x: hidden;
        @include scroll();
      }
    }
    &__shadow {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: opacity 0.2s ease;
      opacity: 1;
      background: $rgba-50;
      z-index: inherit;
      &--enter,
      &--leave-to {
        opacity: 0;
      }
    }
  }
</style>

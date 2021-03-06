<template>
  <main class="wrapper">
    <section
      v-for="(win, key) in windows"
      :key="key"
      class="broadcast"
      :class="{
        'broadcast--loading': win.url,
        'broadcast--disabled': win.disabled,
        'broadcast--first': win.index === settings.firstWindow && !win.disabled,
        'broadcast--hidden': win.index === settings.hiddenWindow,
        'broadcast--scale': settings.hiddenWindow === 1,
        'broadcast--flicker': checkSelectVideoUrl
      }"
      @click="selectWindow(key, checkSelectVideoUrl)"
    >
      <div
        v-if="win.disabled"
        class="broadcast__append"
        @click="addBroadcast"
      />
      <div class="broadcast__bar">
        <div
          v-if="settings.hiddenWindow !== null"
          class="broadcast__btn broadcast__btn--maximize"
          title="Развернуть окно добавления"
          @click="toggleWindows(win.index)"
        />
        <div
          v-if="win.disabled && settings.hiddenWindow === null"
          class="broadcast__btn broadcast__btn--minimize"
          title="Свернуть окно"
          @click="toggleWindows(win.index)"
        />
        <div
          v-if="win.chat.url.length"
          class="broadcast__btn broadcast__btn--chat"
          title="Показать/скрыть чат"
          @click="toggleChat(key)"
        />
        <div
          v-if="win.index !== settings.firstWindow"
          class="broadcast__btn broadcast__btn--expand"
          title="Сделать основным"
          @click="mainWindow(win.index)"
        />
        <div
          class="broadcast__btn broadcast__btn--close"
          title="Удалить окно"
          @click="deleteBroadcast(key,win.index)"
        />
      </div>
      <div class="broadcast__number">
        {{ win.index }}
      </div>
      <div class="broadcast__video">
        <iframe
          width="560"
          height="315"
          :src="win.url"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <transition name="broadcast__chat-">
          <div
            v-show="win.chat.show"
            class="broadcast__chat"
          >
            <iframe
              width="240"
              height="315"
              :src="win.chat.url"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </transition>
      </div>
      <div class="broadcast__panel">
        <keep-alive>
          <input
            v-model.trim.lazy="win.url"
            type="text"
            placeholder="Вставьте URL"
            @change="lineProcessing(key)"
          />
        </keep-alive>
        <button
          class="broadcast__panel-enter"
          title="Ввод"
          @click="lineProcessing(key)"
        />
      </div>
      <error-box :index="key" />
    </section>
  </main>
</template>

<script>
import urlParser from 'js-video-url-parser'
import Error from './Error.vue'

export default {
  name: 'Broadcast',
  components: {
    errorBox: Error
  },
  data() {
    return {
      windows: [
        {
          chat: {
            url: '',
            show: 1
          },
          disabled: 1,
          index: 1,
          url: ''
        }
      ],
      settings: {
        windowsInterator: 0, // quantity
        firstWindow: 1,
        hiddenWindow: null
      }
    }
  },
  computed: {
    checkSelectVideoUrl() {
      // console.log('checkSelectVideoUrl', this.$store.getters.getSelectVideoUrl);
      return this.$store.getters.getSelectVideoUrl
    }
  },
  watch: {
    windows(localWindows) { // следим за windows и обновляем значение в localStorage (предварительно переведя в строку)
      localStorage.windows = JSON.stringify(localWindows)
    },
    /* settings(localSettings) {
        // TODO: Понять причину отказа работы this.$set(this.settings, 'name', thisSettings.name);
        localStorage.settings = JSON.stringify(localSettings);
    }, */
    settings: {
      // TODO: Пришлось запустить глубокое слежение из-за каприза this.$set
      handler(localSettings) { // глубокое слежение
        localStorage.settings = JSON.stringify(localSettings)
      },
      deep: true
    }
  },
  mounted() {
    if (localStorage.windows) { // перезаписываем windows значением из localStorage (предварительно переведя в объект)
      /* TODO: Рецепт https://ru.vuejs.org/v2/cookbook/client-side-storage.html */
      this.windows = JSON.parse(localStorage.windows)
    }
    if (localStorage.settings) {
      this.settings = JSON.parse(localStorage.settings)
    }
  },
  created() {
    if (!localStorage.windows) { // если windows не найден в localStorage
      this.addBroadcast() // вставляем окно добавления (по умолчанию оно блокируется)
    }

    this.$root.$on('urlUpdate', (payload, key = 0) => { // Прослушиваем событие urlUpdate
      /* TODO: Подумать, для каких целей нужно данное событие */
      payload = payload || { url: 'https://www.youtube.com/watch?v=EFIotmFi5Sk', chat: { show: 1 }}
      if (this.settings.windowsInterator <= key) { // проверяем, существует ли окно
        this.addBroadcast()
      }
      this.lineProcessing(key, payload) // присваиваем данные для выбранного окна
    })

    this.$root.$on('cleanUpdate', () => { // Событие для сброса windows в state
      this.removeLocalStorage()
    })
  },
  methods: {
    lineProcessing(key, payload = false) {
      const thisWindow = this.windows[key]
      const url = payload.url || thisWindow.url
      const match = urlParser.parse(url)
      // console.log('lineProcessing',payload, match);

      /* Проверка на наличие url */
      if (match === undefined) {
        this.$store.dispatch('setError', { text: 'Введенный адрес ресурса не поддерживается', index: key })
        thisWindow.url = ''
        thisWindow.chat.url = ''
      }

      /* Проверяем наличие show в payload и обновляем параметр отображение чата */
      if (payload.hasOwnProperty('show')) { // TODO: payload.hasOwnProperty('show') не лучшее решение
        thisWindow.chat.show = payload.chat.show
      }

      /* Проверяем url и преобразуем */
      if (match.provider === 'youtube') {
        const params = '?autoplay=1' + (!key ? '&mute=0' : '&mute=1')
        if (match.id) {
          thisWindow.url = `https://www.youtube.com/embed/${match.id}${params}`
          thisWindow.chat.url = `https://www.youtube.com/live_chat?v=${match.id}&embed_domain=${document.domain}`
        } else {
          this.$store.dispatch('setError', { text: 'Проверьте URL введенного YouTube канала', index: key })
          thisWindow.url = ''
          thisWindow.chat.url = ''
        }
      }
      if (match.provider === 'twitch') {
        const params = '&autoplay=true' + (!key ? '&muted=false' : '&muted=true')
        if (match.channel && match.channel !== 'directory') {
          thisWindow.url = `https://player.twitch.tv/?channel=${match.channel}${params}`
          thisWindow.chat.url = `https://www.twitch.tv/embed/${match.channel}/chat?darkpopout`
        } else if (match.id) {
          thisWindow.url = `https://player.twitch.tv/?video=${match.id}${params}`
          thisWindow.chat.url = `https://www.twitch.tv/embed/${match.channel}/chat?darkpopout`
        } else {
          this.$store.dispatch('setError', { text: 'Проверьте URL введенного Twitch канала', index: key })
          thisWindow.url = ''
          thisWindow.chat.url = ''
        }
      }

      this.$set(this.windows, key, thisWindow) // применяем изменения к основному объекту
    },
    addBroadcast() {
      const thisSettings = this.settings
      const obj = this.windows[thisSettings.windowsInterator]
      obj.disabled = 0 // снимаем блокировку с последнего окна

      thisSettings.windowsInterator++

      this.$set(this.windows, thisSettings.windowsInterator, { chat: { url: '', show: 0 }, disabled: 1, index: obj.index + 1, url: '' }) // добавляем дефолтный объект (окно)

      // this.$set(this.settings, 'windowsInterator', thisSettings.windowsInterator);
    },
    deleteBroadcast(key, index) {
      this.$delete(this.windows, key)

      const thisSettings = this.settings
      thisSettings.windowsInterator--

      if (thisSettings.firstWindow === index) { // контроль первого окна (при удалении первого)
        this.mainWindow(this.windows[0].index)
      }
      if (!thisSettings.windowsInterator) {
        thisSettings.hiddenWindow = null // контроль скрытого окна (при удалении)
      }

      // this.$set(this.settings, 'windowsInterator', thisSettings.windowsInterator);
    },
    mainWindow(index) {
      const thisSettings = this.settings
      thisSettings.firstWindow = index

      // this.$set(this.settings, 'firstWindow', thisSettings.firstWindow);
    },
    toggleWindows(index) {
      const thisSettings = this.settings
      if (thisSettings.hiddenWindow === null) {
        thisSettings.hiddenWindow = index
      } else {
        thisSettings.hiddenWindow = null
      }
      // this.$set(this.settings, 'hiddenWindow', thisSettings.hiddenWindow);
    },
    toggleChat(key) {
      const thisWindow = this.windows[key]
      const chat = thisWindow.chat
      chat.show = !chat.show

      this.$set(this.windows, key, thisWindow)
    },
    selectWindow(key, url) { // выбор окна для вставки url из поисковой выдачи
      if (url) {
        this.lineProcessing(key, { url: url })
        this.$store.dispatch('clearSelectVideoUrl')
      }
    },
    removeLocalStorage() { // переназначаем windows в state на значения по умолчанию
      /* TODO: Плохое решение по сбросу данных до дефолтных */
      // this.$set(this, 'windows', [{chat: {url: '', show: 1}, disabled: 0, index: 1, url: ''}]);
      // this.$set(this, 'settings', {windowsInterator: 0, firstWindow: 1, hiddenWindow: null});
      this.windows = [{ chat: { url: '', show: 1 }, disabled: 0, index: 1, url: '' }]
      this.settings = { windowsInterator: 0, firstWindow: 1, hiddenWindow: null }
      this.addBroadcast()
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes flicker {
    0% {box-shadow: 0 0 0 1px $blue-50;}
    100% {box-shadow: 0 0 15px 1px $blue-50;}
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    font-size: 0;
    box-sizing: border-box;
  }
  .broadcast {
    $this: &;

    position: relative;
    bottom: 0;
    margin: 10px;
    display: inline-block;
    flex-grow: 1;
    width: calc(25% - 20px);
    height: calc(40vh - 30px);
    font-size: 0;
    line-height: 0;
    border-radius: 0 0 4px 4px;
    transition: all .3s ease;
    overflow: hidden;
    &__bar {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3;
      &:first-child {
        margin-left: 0;
      }
    }
    &__btn {
      margin-left: 5px;
      display: inline-block;
      width: 25px;
      height: 25px;
      color: $rgba-255;
      font-size: 18px;
      line-height: 25px;
      text-align: center;
      vertical-align: top;
      background-color: $rgba-26-19;
      transition: opacity 0.2s ease-in-out, transform 300ms ease 0s;
      border-radius: 0 0 4px 4px;
      cursor: pointer;
      opacity: 0;
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        transition: background .3s ease-in-out;
        background-color: $rgba-255;
      }
      &:hover {
       &:before {
         background-color: $blue;
       }
      }
      &--close {
        border-radius: 0 0 0 4px;
        &:before {
          mask: url($icon-close) 50% 50% / 16px no-repeat;
        }
        &:hover {
          &:before {
            background: #a90329;
            background: -moz-linear-gradient(top, #a90329 0%, #8f0222 44%, #6d0019 100%);
            background: -webkit-linear-gradient(top, #a90329 0%,#8f0222 44%,#6d0019 100%);
            background: linear-gradient(to bottom, #a90329 0%,#8f0222 44%,#6d0019 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a90329', endColorstr='#6d0019',GradientType=0 );
          }
        }
      }
      &--expand {
        &:before {
          mask: url($icon-expand) 50% 50% / 24px no-repeat;
        }
      }
      &--minimize {
        border-radius: 0 0 0 4px;
        &:before {
          mask: url($icon-minimize) 50% 50% / 24px no-repeat;
        }
      }
      &--maximize {
        &:before {
          mask: url($icon-maximize) 50% 50% / 24px no-repeat;
        }
      }
      &--chat {
        &:before {
          mask: url($icon-chat) 50% 50% / 24px no-repeat;
        }
      }
    }
    &__number {
      position: absolute;
      top: 11px;
      left: 11px;
      width: 42px;
      height: 42px;
      color: $rgba-255;
      font-size: 25px;
      line-height: 42px;
      text-align: center;
      border-radius: 50%;
      text-shadow: 0 0 5px rgba(23,23,23,0.9);
      background-color: $rgba-26-19;
      transition: opacity 0.2s ease-in-out;
      opacity: 0;
      z-index: 2;
    }
    &:hover:not(&--flicker) & {
      &__number,
      &__btn {
        opacity: 1;
      }
    }
    &__video {
      position: relative;
      display: flex;
      width: 100%;
      height: calc(100% - 30px);
      background-color: rgba(225, 225, 225, .037);
      iframe {
        width: 100%;
        height: 100%;
      }
    }
    &__chat {
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 30%;
      min-width: 240px;
      max-width: 340px;
      height: 100%;
      &--enter,
      &--leave,
      &--leave-to {
        right: -100%;
        width: 0;
        &-active {
          transition: all 0.3s cubic-bezier(.65, .05, .36, 1);
        }
      }
    }
    &__panel {
      position: relative;
      color: $rgba-255-70;
      border-radius: 0 0 4px 4px;
      background: rgb(40, 40, 40);
      z-index: 2;
      input {
        display: block;
        padding: 5px 30px 5px 15px;
        width: 100%;
        border: 1px solid rgb(40, 40, 40);
        box-sizing: border-box;
        color: inherit;
        font-size: 14px;
        line-height: 18px;
        background: none;
        border-radius: 0 0 4px 4px;
        box-sizing: border-box;
        &:focus {
          border-color: $blue;
          outline: none;
        }
      }
      &-enter {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
        background: url($icon-enter) 50% 50% / cover no-repeat;
        transition: opacity 0.2s ease-in-out;
        opacity: .2;
        cursor: pointer;
        border: none;
        &:hover {
          opacity: .7;
        }
        &:focus {
          outline: 1px solid $blue;
        }
      }
    }
    &__append {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      background:  url($icon-plus) 50% 50% / 110px no-repeat;
      transition: opacity .3s ease;
      opacity: .06;
      cursor: cell;
      z-index: 3;
    }
    &--first {
      display: block;
      order: -1;
      width: 100%;
      height: calc(60vh - 86px);
    }
    &--first & {
      &__chat {
        position: relative;
      }
    }
    &--scale {
      height: calc(100vh - 96px);
    }
    &--hidden {
      position: fixed;
      top: -100%;
      left: -100%;
      width: 0;
      height: 0;
    }
    &--disabled {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(19, 19, 19, 0.5);
        z-index: 3;
      }
    }
    &--disabled & {
      &__bar {
        z-index: 4;
      }
      &__btn {
        display: none;
        &--minimize,
        &--maximize {
          display: block;
        }
      }
    }
    &--loading {
      &:before {
        content: 'Загрузка . . .';
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 30px;
        width: 100%;
        height: 100%;
        color: $rgba-255-50;
        font-size: 1.5rem;
        line-height: 1.5rem;
        box-sizing: border-box;
      }
    }
    &--disabled:first-child,
    &:first-child + &--disabled {
      flex-grow: 0;
      width: calc(50% - 20px);
    }
    &--flicker {
      animation: flicker 1s infinite ease-in-out alternate;
      cursor: pointer;
      &:before {
        content: 'Выберите окно';
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 30px;
        width: 100%;
        height: 100%;
        color: $blue;
        background-color: $rgba-50;
        font-size: 2.5rem;
        line-height: 2.5rem;
        box-sizing: border-box;
        transition: all .15s ease;
        z-index: 5;
      }
      &:hover {
        /*animation-play-state: paused;*/
        &:before {
          content: 'Выбрать это окно';
          color: $rgba-255;
          background-color: $blue-50;
        }
      }
    }
    &--flicker#{$this}--disabled {
      &:before {
        display: none;
      }
      &:hover {
        #{$this}__append {
          background-color: $blue;
          opacity: .5;
        }
      }
    }
  }
  .error {
    &-box {
      position: absolute;
      top: auto;
      bottom: 30px;
      left: 0;
      text-align: left;
      z-index: 1;
    }
    &--enter,
    &--leave-to {
      top: auto;
      bottom: -30px;
    }
  }
  @media only screen and (max-width: 812px) {
    .broadcast {
      width: 100%;
      height: calc(33vh - (128px / 3));
      &__btn {
        &--chat {
          display: none;
        }
      }
      &__chat {
        display: none;
      }
      &--first {
        height: calc(33vh - (136px / 3));
      }
      &--scale {
        height: calc(100vh - 96px);
      }
      &:first-child + &--disabled {
        width: 100%;
      }
    }
  }
  @media only screen and (min-width: 1024px) and (orientation: portrait) {
    .broadcast {
      width: 100%;
      height: calc(33vh - (136px / 3));
      &__btn {
        &--chat {
          display: inline-block;
        }
      }
      &__chat {
        display: block;
        position: relative;
      }
      &--first {
        height: calc(33vh - (136px / 3));
      }
      &--first & {
        &__chat {
          position: relative;
        }
      }
      &--scale {
        height: calc(100vh - 96px);
      }
      &:first-child + &--disabled {
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: 1023px) and (orientation: landscape) {
    .broadcast {
      width: 100%;
      height: calc(100vh - 96px);
      &__chat {
        position: relative;
      }
      &--first {
        height: calc(100vh - 96px);
      }
      &--first & {
        &__chat {
          position: relative;
        }
      }
    }
  }
</style>

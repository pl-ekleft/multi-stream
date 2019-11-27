<template>
  <div class="form-search">
    <keep-alive>
      <input
        v-model.trim.lazy="query"
        type="search"
        class="form-search__input"
        placeholder="Введите запрос"
        @click="clearSelectVideoUrl"
        @change="sendingRequest"
      />
    </keep-alive>
    <div
      class="form-search__btn"
      @click="sendingRequest"
    />
    <ul
      v-if="showResult"
      class="form-search-list form-search-list--scroll"
    >
      <li
        v-for="(item, key) in result.items"
        :key="key"
        class="form-search-list__item"
        @click="selectVideoUrl(item.id.videoId)"
      >
        <div class="form-search-list__thumb">
          <img
            :src="item.snippet.thumbnails.default.url"
            :alt="item.snippet.title"
          />
        </div>
        <div class="form-search-list__title">
          {{ item.snippet.title }}
        </div>
        <div class="form-search-list__channel">
          {{ item.snippet.channelTitle }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      provider: 'youtube',
      query: '',
      result: false,
      showResult: false,
      pageNumber: 0
    }
  },
  computed: {
    checkSearchResult() {
      return this.$store.getters.getSearchShadow
    }
  },
  created() {
    this.$root.$on('searchHide', (payload) => { // Прослушиваем событие searchHide
      this.toggleResult(payload)
    })
  },
  methods: {
    selectVideoUrl(videoId) {
      if (this.provider === 'youtube' && videoId.length) {
        // Преобразуем videoId в валидный url и диспатчим
        this.$store.dispatch('setSelectVideoUrl', `https://www.youtube.com/embed/${videoId}`)
        // console.log('getSelectVideoUrl result:', this.$store.getters.getSelectVideoUrl);
      } else {
        this.$store.dispatch('setError', { text: 'Не удалось получить videoId', index: 'main' })
      }
      this.toggleResult(false)
    },
    clearSelectVideoUrl() { // очищаем выбранный url видео
      this.$store.dispatch('clearSelectVideoUrl')
    },
    sendingRequest() {
      if (this.provider === 'youtube' && this.query.length) {
        this.$store.dispatch('search', this.query) // отправляем поисковый запрос
          .then(() => {
            this.result = this.$store.getters.getSearchData
            if (this.result.pageInfo.totalResults) {
              this.toggleResult(true)
            } else {
              this.toggleResult(false)
              this.$store.dispatch('setError', {
                text: 'Поиск не дал результатов',
                index: 'main'
              })
            }
            // console.log('sendingRequest result:', this.result);
            /* TODO: Тестово выводим первое видео в первое окно через вызов события
            this.$root.$emit('urlUpdate',{
              url:`https://www.youtube.com/embed/${this.result.items[0].id.videoId}`,
              chat: {
                show: 0
              }
            },0) */
          })
          .catch(() => {
          })
      } else {
        this.toggleResult(false)
        this.$store.dispatch('setError', { text: 'Поисковый запрос пуст', index: 'main' })
      }
    },
    toggleResult(status) {
      this.showResult = status /* TODO: На сколько сильно это необходимо? */
      this.$store.dispatch('setShadow', status)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-search {
    position: relative;
    margin: 0 40px;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    &__input {
      position: relative;
      padding: 0 8px;
      width: 100%;
      height: 28px;

      display: flex;
      flex: 1;
      flex-basis: 0.000000001px;
      flex-direction: row;
      align-items: center;

      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: hsla(0, 0%, 100%, 0.88);
      border: 1px solid hsl(0, 0%, 19%);
      border-radius: 2px 0 0 2px;
      box-sizing: content-box;
      background-color: hsl(0, 0%, 7%);
      &:focus {
        border-color: $blue;
        outline: none;
      }
    }
    &__btn {
      display: flex;
      align-items: center;
      margin: 0;
      width: 65px;
      height: 28px;
      border: 1px solid hsl(0, 0%, 19%);
      background-color: hsl(0, 0%, 19%);
      border-radius: 0 2px 2px 0;
      &:before {
        content: '';
        display: block;
        margin: 0 auto;
        width: 20px;
        height: 20px;
        transition: opacity .2s ease-in-out;
        background-color: $rgba-255-50;
        mask: url($icon-search) 50% 50% / cover no-repeat;
        opacity: 0.6;
      }
      &:hover {
        cursor: pointer;
        &:before {
          opacity: 1;
        }
      }
    }
    &-list {
      position: absolute;
      top: 100%;
      left: 0;
      padding: 8px 3px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
      border-radius: 0 0 2px 2px;
      border: 1px solid hsl(0, 0%, 19%);
      border-top: 0;
      box-sizing: border-box;
      background-color: hsl(0, 0%, 7%);
      z-index: 2023;
      &--scroll {
        max-height: calc(100vh - 60px);
        overflow-y: auto;
        overflow-x: hidden;
        @include scroll();
      }
      &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 210px;
        margin: 3px;
        &:hover {
          cursor: pointer;
        }
      }
      &__item:hover & {
        &__thumb {
          &:before {
            content: 'Выбрать';
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            font-size: 2.5rem;
            line-height: 2.5rem;
            opacity: 0.9;
            z-index: 2;
          }
          &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            background-color: $rgba-50;
            z-index: 1;
          }
        }
      }
      &__thumb {
        position: relative;
        img {
          width: 210px;
          height: 118px;
        }
      }
      &__title {
        margin: 8px 0 8px;
        width: 100%;
        color: $rgba-255;
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.6rem;
      }
      &__channel {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        max-height: 1.8rem;
        color: hsl(0, 0%, 53%);
        font-size: 1.3rem;
        font-weight: 400;
        line-height: 1.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  @media only screen and (max-width: 812px) {
    .form-search {
      margin: 0 20px;
      &__btn {
        width: 28px;
      }
    }
  }
</style>

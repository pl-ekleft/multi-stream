<template>
    <div class="form-search">
        <keep-alive>
            <input type="search"
                   class="form-search__input"
                   placeholder="Введите запрос"
                   v-model.trim.lazy="query"
                   @click="clearSelectVideoUrl"
                   @change="sendingRequest"
            >
        </keep-alive>
        <div class="form-search__btn" @click="sendingRequest"></div>
        <ul class="form-search-list form-search-list--scroll"
            v-if="result"
            @click="result=false"
        >
            <li class="form-search-list__item"
                v-for="(item, key) in result.items"
                :key="key"
                @click="selectVideoUrl(item.id.videoId)"
            >
                <div class="form-search-list__thumb">
                    <img :src="item.snippet.thumbnails.default.url" :alt="item.snippet.title"/>
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
        name: "SearchBar",
        data() {
            return {
                provider: 'youtube',
                shadowShow: 0,
                query: '',
                result: false
            }
        },
        methods: {
            selectVideoUrl(videoId) {
                if (this.provider === 'youtube' && videoId.length) {
                    // Преобразуем videoId в валидный url и диспатчим
                    this.$store.dispatch('setSelectVideoUrl', `https://www.youtube.com/embed/${videoId}`);
                    // console.log('getSelectVideoUrl result:', this.$store.getters.getSelectVideoUrl);
                } else {
                    this.$store.dispatch('setError', {text: 'Не удалось получить videoId', index: 'main'})
                }
            },
            sendingRequest() {
                if (this.provider === 'youtube' && this.query.length) {
                    this.$store.dispatch('search', this.query)
                        .then(() => {
                            this.result = this.$store.getters.getSearchData;
                            if (!this.result.pageInfo.totalResults) {
                                return this.$store.dispatch('setError', {
                                    text: 'Поиск не дал результатов',
                                    index: 'main'
                                })
                            }
                            // console.log('sendingRequest result:', this.result);
                            /*eventEmitter.$emit('urlUpdated',{ // TODO: Тестово выводим первое видео в первое окно
                                url:`https://www.youtube.com/embed/${this.result.items[0].id.videoId}`,
                                chat: {
                                    show: 0
                                }
                            })*/
                        })
                        .catch(() => {
                        })
                } else {
                    this.$store.dispatch('setError', {text: 'Поисковый запрос пуст', index: 'main'})
                }
            },
            clearSelectVideoUrl() {// очищаем выбранный url видео
                this.$store.dispatch('clearSelectVideoUrl');
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
                max-height: 390px;
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
                    /*background-color: $rgba-255-19;*/
                    cursor: pointer;
                }
            }
            &__item:hover & {
                &__thumb {
                    &:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        background: url($icon-plus) 50% 50% no-repeat / contain;
                        opacity: 0.7;
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
                /*&:hover {
                    color: $rgba-255-74;
                }*/
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

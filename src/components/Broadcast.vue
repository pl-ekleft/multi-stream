<template>
    <div class="wrapper">
        <div class="broadcast"
             v-for="(win, key) in windows"
             :key="key"
             :class="{
                 'broadcast--disabled': win.disabled,
                 'broadcast--first': key === fistWindow,
                 'broadcast--collapse': key === collapseWindow,
                 'broadcast--scale': collapseWindow === 1
             }">
            <div class="broadcast__append"
                 v-if="win.disabled"
                 @click="addBroadcast"
            ></div>
            <div class="broadcast__bar">
                <div class="broadcast__btn broadcast__btn--maximize"
                     title="Развернуть окно добавления"
                     v-if="collapseWindow !== null"
                     @click="toggleWindows(key)"
                ></div>
                <div class="broadcast__btn broadcast__btn--minimize"
                     title="Свернуть окно"
                     v-if="win.disabled && collapseWindow === null"
                     @click="toggleWindows(key)"
                ></div>
                <div class="broadcast__btn broadcast__btn--chat"
                     title="Показать/скрыть чат"
                     v-if="win.chat.url.length"
                     @click="toggleChat(key)"
                ></div>
                <div class="broadcast__btn broadcast__btn--expand"
                     title="Сделать основным"
                     v-if="key !== fistWindow"
                     @click="selectWindow(key)"
                ></div>
                <div class="broadcast__btn broadcast__btn--close"
                     title="Удалить окно"
                     @click="deleteBroadcast(key)"
                ></div>
            </div>
            <div class="broadcast__number" v-html="win.index"></div>
            <div class="broadcast__video">
                <iframe
                        width="560"
                        height="315"
                        :src="win.url"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                ></iframe>
                <transition name="broadcast__chat-">
                    <div class="broadcast__chat"
                         v-show="win.chat.show"
                    >
                        <iframe
                                width="240"
                                height="315"
                                :src="win.chat.url"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                        ></iframe>
                    </div>
                </transition>
            </div>
            <div class="broadcast__panel">
                <keep-alive>
                    <input type="text"
                           placeholder="Вставьте URL"
                           v-model.trim.lazy="win.url"
                           @change="lineProcessing(key)"
                    >
                </keep-alive>
                <div class="broadcast__panel-enter"
                     title="Ввод"
                     @click="lineProcessing(key)"
                ></div>
            </div>
            <error-box :index="key"></error-box>
        </div>
    </div>
</template>

<script>
    import { eventEmitter } from '../main.js'
    import urlParser from 'js-video-url-parser'
    import Error from './Error.vue'

    export default {
        name: "Broadcast",
        data() {
            return {
                windows: [
                    {
                        index: 1,
                        url: '',
                        disabled: 0,
                        chat: {
                            url: '',
                            show: 1
                        }
                    }
                ],
                windowsInterator: 0,
                fistWindow: 0,
                collapseWindow: null,
            }
        },
        components: {
            errorBox: Error
        },
        methods: {
            /**
             * TODO: Реализовать поиск по youtube && twitch, через строку ввода адреса или отдельным полем поиска
             */
            lineProcessing: function(key) {
                const url = this.windows[key].url;
                const match = urlParser.parse(url);
                // console.log(match);

                /* Проверка на наличие url */
                if (match === undefined) { // старое условие !/^(http|https):\/\/[^ "]+$/.test(url)
                    this.$store.dispatch('setError', {text: 'Введенный адрес ресурса не поддерживается', index: key});
                    this.windows[key].url='';
                    return false;
                }

                /* Проверяем url и преобразовывваем */
                if(match.provider === 'youtube') { // старое условие url.indexOf('twitch') + 1
                    let params = '?autoplay=1'+(!key?'&mute=0':'&mute=1');
                    if (match.id) {
                        this.windows[key].url = 'https://www.youtube.com/embed/'+match.id+params;
                        this.windows[key].chat.url="";
                        this.windows[key].chat.show=0;
                    } else {
                        this.$store.dispatch('setError', {text: 'Проверьте URL введенного YouTube канала', index: key});
                        this.windows[key].url='';
                        return false;
                    }
                }
                if(match.provider === 'twitch') {
                    let params = '&autoplay=true'+(!key?'&muted=false':'&muted=true');
                    if (match.channel && match.channel !== 'directory') {
                        this.windows[key].url = 'https://player.twitch.tv/?channel='+match.channel+params;
                        this.windows[key].chat.url = 'https://www.twitch.tv/embed/'+match.channel+'/chat?darkpopout';
                    } else if (match.id) {
                        this.windows[key].url = 'https://player.twitch.tv/?video='+match.id+params;
                        this.windows[key].chat.url = 'https://www.twitch.tv/embed/'+match.channel+'/chat?darkpopout';
                    } else {
                        this.$store.dispatch('setError', {text: 'Проверьте URL введенного Twitch канала', index: key});
                        this.windows[key].url='';
                        return false;
                    }
                }
            },
            addBroadcast() {
                let obj = this.windows[this.windowsInterator];
                    obj.disabled = 0; // снимаем блокировку с последнего окна
                this.windowsInterator++;
                this.$set(this.windows, this.windowsInterator, {url: '', disabled: 1, chat: {url: '', show: 0}, index: obj.index+1}); // к массиву windows вставляем поле/ключ windowsInterator с default объектом
            },
            deleteBroadcast(key) {
                this.windowsInterator--;
                this.$delete(this.windows, key);
            },
            selectWindow(key) {
                this.fistWindow = key;
            },
            toggleWindows(key) {
                if(this.collapseWindow === null) {
                    this.collapseWindow = key;
                } else {
                    this.collapseWindow = null;
                }
            },
            toggleChat(key) {
                let chat = this.windows[key].chat;
                    chat.show = !chat.show;
            }
        },
        mounted () {

        },
        created () {
            this.addBroadcast();
            eventEmitter.$on('urlUpdated', () => { // Прослушиваем событие urlUpdated
                this.windows[0].url="https://www.youtube.com/embed/bpp2KgRSuPQ?autoplay=1";
                this.windows[0].chat.show=0;
                /*this.windows[0].url="https://player.twitch.tv/?channel=xairas_gaming&autoplay=1"
                this.windows[0].chat.url="https://www.twitch.tv/embed/xairas_gaming/chat"*/
            })
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        padding: 10px;
        font-size: 0;
        box-sizing: border-box;
    }
    .broadcast {
        position: relative;
        bottom: 0;
        margin: 10px;
        display: inline-block;
        flex-grow: 1;
        width: calc(25% - 20px);
        /*min-width: calc(25% - 20px);*/
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
        &:hover & {
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
                border: 0;
                box-sizing: border-box;
                color: inherit;
                font-size: 14px;
                line-height: 20px;
                background: none;
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
                &:hover {
                    opacity: .7;
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
        &--collapse {
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
        &:first-child + &--disabled {
            flex-grow: 0;
            width: calc(50% - 20px);
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

<template>
    <div class="wrapper">
        <div class="broadcast"
             v-for="(win, key, index) in windows"
             :key="key"
             :class="{'broadcast--disabled': win.disabled, 'broadcast--first': key === fistWindow, 'broadcast--collapse': key === collapseWindow }"
             v-dragging="{ item: win, list: windows, group: 'window' }">
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
                    } else {
                        this.$store.dispatch('setError', {text: 'Проверьте URL введенного YouTube канала', index: key});
                        this.windows[key].url='';
                        return false;
                    }
                }
                if(match.provider === 'twitch') {
                    /**
                     * TODO: Чат временно доступен только для главного окна
                     */
                    let params = '&autoplay=true'+(!key?'&muted=false':'&muted=true');
                    if (match.channel && match.channel !== 'directory') {
                        this.windows[key].url = 'https://player.twitch.tv/?channel='+match.channel+params;
                        this.windows[key].chat.url = 'https://www.twitch.tv/embed/'+match.channel+'/chat';
                    } else if (match.id) {
                        this.windows[key].url = 'https://player.twitch.tv/?video='+match.id+params;
                        this.windows[key].chat.url = 'https://www.twitch.tv/embed/'+match.channel+'/chat';
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
                this.windows[0].url="https://www.youtube.com/embed/bpp2KgRSuPQ?autoplay=1"
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
            color: #fff;
            font-size: 18px;
            line-height: 25px;
            text-align: center;
            vertical-align: top;
            background-color: rgba(26, 26, 26, 0.8);
            transition: opacity 0.2s ease-in-out;
            border-radius: 0 0 4px 4px;
            cursor: pointer;
            opacity: 0;
            &--close {
                border-radius: 0 0 0 4px;
                background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20100%20100%22%20enable-background%3D%22new%200%200%20100%20100%22%20xml%3Aspace%3D%22preserve%22%20fill%3D%22%23fff%22%3E%3Cpolygon%20points%3D%2295%2C17.837%2082.163%2C5%2050%2C37.163%2017.837%2C5%205%2C17.837%2037.163%2C50%205%2C82.163%2017.837%2C95%2050%2C62.837%2082.163%2C95%2095%2C82.163%20%20%2062.837%2C50%20%22%2F%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / 16px no-repeat rgba(26, 26, 26, 0.8);
            }
            &--expand {
                background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20100%20100%22%20enable-background%3D%22new%200%200%20100%20100%22%20xml%3Aspace%3D%22preserve%22%20fill%3D%22%23fff%22%3E%3Cpath%20d%3D%22M81.9%2C19.7v60.7c0%2C0.9-0.7%2C1.6-1.6%2C1.6H51.1c-0.9%2C0-1.6-0.7-1.6-1.6c0-0.9%2C0.7-1.6%2C1.6-1.6h27.7V21.3H21.3v27.5%20%20c0%2C0.9-0.7%2C1.6-1.6%2C1.6c-0.9%2C0-1.6-0.7-1.6-1.6V19.7c0-0.9%2C0.7-1.6%2C1.6-1.6h60.7C81.2%2C18.1%2C81.9%2C18.8%2C81.9%2C19.7z%20M18.1%2C58.1%20%20c0-0.9%2C0.7-1.6%2C1.6-1.6h22.3c0.9%2C0%2C1.6%2C0.7%2C1.6%2C1.6v22.3c0%2C0.9-0.7%2C1.6-1.6%2C1.6H19.7c-0.9%2C0-1.6-0.7-1.6-1.6V58.1z%20M21.3%2C78.7h19.1%20%20V59.7H21.3V78.7z%20M47.2%2C52.8c0.3%2C0.3%2C0.7%2C0.5%2C1.1%2C0.5s0.8-0.2%2C1.1-0.5l18.1-18.1v10.4c0%2C0.9%2C0.7%2C1.6%2C1.6%2C1.6s1.6-0.7%2C1.6-1.6V30.9%20%20c0-0.9-0.7-1.6-1.6-1.6H54.8c-0.9%2C0-1.6%2C0.7-1.6%2C1.6c0%2C0.9%2C0.7%2C1.6%2C1.6%2C1.6h10.4L47.2%2C50.6C46.5%2C51.2%2C46.5%2C52.2%2C47.2%2C52.8z%22%2F%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / 24px no-repeat rgba(26, 26, 26, 0.8);
            }
            &--minimize {
                border-radius: 0 0 0 4px;
                background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20x%3D%220px%22%20y%3D%220px%22%20fill%3D%22%23fff%22%3E%3Cg%3E%3Cpath%20d%3D%22M5.5%2C12a.49971.49971%2C0%2C0%2C1-.5-.5v-6A.49971.49971%2C0%2C0%2C1%2C5.5%2C5h6a.5.5%2C0%2C0%2C1%2C0%2C1H6v5.5A.49971.49971%2C0%2C0%2C1%2C5.5%2C12ZM19%2C18.5v-6a.5.5%2C0%2C0%2C0-1%2C0V18H12.5a.5.5%2C0%2C0%2C0%2C0%2C1h6A.49971.49971%2C0%2C0%2C0%2C19%2C18.5ZM19.864%2C4.84314%2C14.7677%2C9.93939h3.03558a.5.5%2C0%2C0%2C1%2C0%2C.99994H13.56061a.49985.49985%2C0%2C0%2C1-.49994-.5V6.19672a.49994.49994%2C0%2C1%2C1%2C.99988%2C0V9.2323L19.1568%2C4.13605a.5.5%2C0%2C1%2C1%2C.70715.70709Zm-9.42459%2C8.2175H6.19675a.5.5%2C0%2C1%2C0%2C0%2C.99994H9.23233L4.13608%2C19.15683a.5.5%2C0%2C0%2C0%2C.70709.70709l5.09625-5.09625v3.03558a.49994.49994%2C0%2C1%2C0%2C.99988%2C0V13.56064A.49981.49981%2C0%2C0%2C0%2C10.43936%2C13.06064Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / 24px no-repeat rgba(26, 26, 26, 0.8);
            }
            &--maximize {
                background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20x%3D%220px%22%20y%3D%220px%22%20fill%3D%22%23fff%22%3E%3Cg%3E%3Cpath%20d%3D%22M20.01034%2C4.48959V8.73227a.5.5%2C0%2C0%2C1-.99993%2C0V5.69669L5.69669%2C19.01041H8.73227a.49994.49994%2C0%2C1%2C1%2C0%2C.99987H4.48959a.4998.4998%2C0%2C0%2C1-.49993-.49994V15.26773a.5.5%2C0%2C1%2C1%2C.99993%2C0v3.03558L18.30331%2C4.98953H15.26773a.49994.49994%2C0%2C1%2C1%2C0-.99987h4.24268A.49983.49983%2C0%2C0%2C1%2C20.01034%2C4.48959ZM6%2C11.5V6h5.5a.5.5%2C0%2C0%2C0%2C0-1h-6a.49971.49971%2C0%2C0%2C0-.5.5v6a.5.5%2C0%2C0%2C0%2C1%2C0ZM18.5%2C19h-6a.5.5%2C0%2C0%2C1%2C0-1H18V12.5a.5.5%2C0%2C0%2C1%2C1%2C0v6A.49971.49971%2C0%2C0%2C1%2C18.5%2C19Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / 24px no-repeat rgba(26, 26, 26, 0.8);
            }
            &--chat {
                background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20data-name%3D%22Layer%201%22%20viewBox%3D%220%200%2024%2024%22%20x%3D%220px%22%20y%3D%220px%22%20fill%3D%22%23fff%22%3E%3Cpath%20d%3D%22M18%2C8H15V6a2%2C2%2C0%2C0%2C0-2-2H6A2%2C2%2C0%2C0%2C0%2C4%2C6v5a2%2C2%2C0%2C0%2C0%2C2%2C2v1.58575a.99927.99927%2C0%2C0%2C0%2C1.0072%2C1.002.97924.97924%2C0%2C0%2C0%2C.69989-.29486L9%2C14v1a2%2C2%2C0%2C0%2C0%2C2%2C2h3l2.29291%2C2.29291a.97924.97924%2C0%2C0%2C0%2C.69989.29486A.99927.99927%2C0%2C0%2C0%2C18%2C18.58575V17a2%2C2%2C0%2C0%2C0%2C2-2V10A2%2C2%2C0%2C0%2C0%2C18%2C8ZM7%2C14.58575V12H6a1.00115%2C1.00115%2C0%2C0%2C1-1-1V6A1.00115%2C1.00115%2C0%2C0%2C1%2C6%2C5h7a1.00115%2C1.00115%2C0%2C0%2C1%2C1%2C1v5a1.00115%2C1.00115%2C0%2C0%2C1-1%2C1H9.58582ZM19%2C15a1.00115%2C1.00115%2C0%2C0%2C1-1%2C1H17v2.58575L14.41418%2C16H11a1.00115%2C1.00115%2C0%2C0%2C1-1-1V13h3a2%2C2%2C0%2C0%2C0%2C2-2V9h3a1.00115%2C1.00115%2C0%2C0%2C1%2C1%2C1Z%22%2F%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / 24px no-repeat rgba(26, 26, 26, 0.8);
            }
        }
        &__number {
            position: absolute;
            top: 11px;
            left: 11px;
            width: 42px;
            height: 42px;
            color: #fff;
            font-size: 25px;
            line-height: 42px;
            text-align: center;
            border-radius: 50%;
            text-shadow: 0 0 5px rgba(23,23,23,0.9);
            background-color: rgba(26, 26, 26, 0.8);
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
            background:  rgba(225, 225, 225, .037);
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
            color: rgba(255, 255, 255, 0.7);
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
                background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2024%2024%22%20style%3D%22enable-background%3Anew%200%200%2024%2024%3B%22%20xml%3Aspace%3D%22preserve%22%20fill%3D%22%23fff%22%3E%3Cg%3E%3Cg%3E%3Cpath%20d%3D%22M20.5%2C0h-17C1.57%2C0%2C0%2C1.57%2C0%2C3.5v17C0%2C22.43%2C1.57%2C24%2C3.5%2C24h17c1.93%2C0%2C3.5-1.57%2C3.5-3.5v-17C24%2C1.57%2C22.43%2C0%2C20.5%2C0z%20%20%20%20%20M20%2C13.5c0%2C0.276-0.224%2C0.5-0.5%2C0.5H9v2.5c0%2C0.189-0.107%2C0.362-0.276%2C0.447C8.653%2C16.982%2C8.576%2C17%2C8.5%2C17%20%20%20%20c-0.106%2C0-0.212-0.034-0.3-0.1l-4-3C4.074%2C13.806%2C4%2C13.657%2C4%2C13.5s0.074-0.306%2C0.2-0.4l4-3c0.151-0.114%2C0.355-0.131%2C0.523-0.047%20%20%20%20C8.893%2C10.138%2C9%2C10.311%2C9%2C10.5V13h10V7.5C19%2C7.224%2C19.224%2C7%2C19.5%2C7S20%2C7.224%2C20%2C7.5V13.5z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / cover no-repeat;
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
            background:  url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xml%3Aspace%3D%22preserve%22%20version%3D%221.1%22%20viewBox%3D%220%200%20847%201058.75%22%20x%3D%220px%22%20y%3D%220px%22%3E%3Cpath%20class%3D%22fil0%22%20fill%3D%22%23fff%22%20d%3D%22M356%209c45%2C0%2090%2C0%20134%2C0%2019%2C0%2035%2C15%2035%2C34%200%2C93%200%2C186%200%2C279%2093%2C0%20186%2C0%20278%2C0%2019%2C0%2035%2C16%2035%2C34%200%2C45%200%2C90%200%2C134%200%2C19%20-16%2C35%20-35%2C35%20-92%2C0%20-185%2C0%20-278%2C0%200%2C93%200%2C185%200%2C278%200%2C19%20-16%2C35%20-35%2C35%20-44%2C0%20-89%2C0%20-134%2C0%20-18%2C0%20-34%2C-16%20-34%2C-35%200%2C-93%200%2C-185%200%2C-278%20-93%2C0%20-186%2C0%20-279%2C0%20-19%2C0%20-34%2C-16%20-34%2C-35%200%2C-44%200%2C-89%200%2C-134%200%2C-18%2015%2C-34%2034%2C-34%2093%2C0%20186%2C0%20279%2C0%200%2C-93%200%2C-186%200%2C-279%200%2C-19%2016%2C-34%2034%2C-34z%22%2F%3E%3C%2Fsvg%3E%0A') 50% 50% / 110px no-repeat;
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
                height: calc(33vh - (128px / 3));
            }
        }
    }
    @media only screen and (min-width: 1024px) and (orientation: portrait) {
        .broadcast {
            width: 100%;
            height: calc(33vh - (128px / 3));
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
                height: calc(33vh - (128px / 3));
            }
            &--first & {
                &__chat {
                    position: relative;
                }
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

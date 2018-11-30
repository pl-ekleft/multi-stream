<template>
    <div>
        <div class="broadcast"
             v-for="(win, key, index) in windows"
             :key="key"
             :class="{'broadcast--disabled': win.disabled}"
             v-dragging="{ item: win, list: windows, group: 'window' }">
            <transition name="broadcast__add-">
                <div class="broadcast__add"
                     v-if="win.disabled"
                     @click="addBroadcast"
                ></div>
            </transition>
            <div class="broadcast__close"
                 title="Удалить окно"
                 @click="deleteBroadcast(key)"
            ></div>
            <div class="broadcast__expand" title="Перетащить"></div>
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
    import Error from './Error.vue'

    export default {
        name: "Broadcast",
        data() {
            return {
                windows: [
                    {
                        index: 1,
                        url: '',
                        disabled: 0
                    },
                    {
                        index: 2,
                        url: '',
                        disabled: 1
                    }
                ],
                windowsInterator: 1,
            }
        },
        components: {
            errorBox: Error
        },
        methods: {
            lineProcessing: function(key) {
                const url = this.windows[key].url;

                /* Проверка на наличие url */
                if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
                    this.$store.dispatch('setError', {text: 'Введите корректный URL адрес', index: key});
                    this.windows[key].url='';
                    return;
                }

                /* Проверяем url на наличие youtube и преобразовывваем */
                if(url.indexOf('youtu') + 1) {
                    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    let match = url.match(regExp);
                    let params = '?autoplay=1'+(!key?'':'&mute=1');
                    if (match && match[2].length === 11) {
                        this.windows[key].url = 'https://www.youtube.com/embed/'+match[2]+params;
                    } else {
                        this.$store.dispatch('setError', {text: 'Проверьте введенный URL адрес YouTube', index: key});
                    }
                }
            },
            addBroadcast() {
                let obj = this.windows[this.windowsInterator];
                    obj.disabled = 0; // снимаем блокировку с последнего окна
                this.windowsInterator++;
                this.$set(this.windows, this.windowsInterator, {url: '', disabled: 1, index: obj.index+1}); // к массиву windows вставляем поле/ключ windowsInterator с default объектом
            },
            deleteBroadcast(key) {
                this.windowsInterator--;
                this.$delete(this.windows, key);
            }
        },
        created () {
            eventEmitter.$on('urlUpdated', () => { // Прослушиваем событие urlUpdated
                this.windows[0].url="https://www.youtube.com/embed/bpp2KgRSuPQ?autoplay=1"
            })
        }
    }
</script>

<style lang="scss" scoped>
    .broadcast {
        position: relative;
        margin: 20px 0 0;
        display: inline-block;
        width: calc(50% - 10px);
        height: calc(40vh - 30px);
        font-size: 0;
        line-height: 0;
        border-radius: 0 0 4px 4px;
        transition: all .5s ease;
        overflow: hidden;
        &:first-child {
            display: block;
            width: 100%;
            height: calc(60vh - 86px);
            margin: 0 auto;
        }
        &__close,
        &__expand {
            position: absolute;
            top: 0;
            right: 0;
            width: 25px;
            height: 25px;
            font-size: 18px;
            line-height: 25px;
            text-align: center;
            color: #fff;
            background-color: rgba(26, 26, 26, 0.8);
            transition: opacity 0.2s ease-in-out;
            border-radius: 0 0 0 4px;
            cursor: pointer;
            opacity: 0;
        }
        &__close {
            background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20100%20100%22%20enable-background%3D%22new%200%200%20100%20100%22%20xml%3Aspace%3D%22preserve%22%20fill%3D%22%23fff%22%3E%3Cpolygon%20points%3D%2295%2C17.837%2082.163%2C5%2050%2C37.163%2017.837%2C5%205%2C17.837%2037.163%2C50%205%2C82.163%2017.837%2C95%2050%2C62.837%2082.163%2C95%2095%2C82.163%20%20%2062.837%2C50%20%22%2F%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / 16px no-repeat rgba(26, 26, 26, 0.8);
        }
        &__expand {
            right: 30px;
            border-radius: 0 0 4px 4px;
            cursor: move;
            background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20512%20512%22%20enable-background%3D%22new%200%200%20512%20512%22%20xml%3Aspace%3D%22preserve%22%20fill%3D%22%23fff%22%3E%3Cpolygon%20points%3D%22374%2C186.5%20347.5%2C213%20371.7%2C237.2%20274.7%2C237.2%20274.7%2C140.3%20299%2C164.5%20325.5%2C138%20256%2C68.5%20186.5%2C138%20213%2C164.5%20%20%20237.2%2C140.3%20237.2%2C237.2%20140.3%2C237.2%20164.5%2C213%20138%2C186.5%2068.5%2C256%20138%2C325.5%20164.5%2C299%20140.3%2C274.7%20237.2%2C274.7%20237.2%2C371.7%20%20%20213%2C347.5%20186.5%2C374%20256%2C443.5%20325.5%2C374%20299%2C347.5%20274.7%2C371.7%20274.7%2C274.7%20371.7%2C274.7%20347.5%2C299%20374%2C325.5%20443.5%2C256%20%22%2F%3E%3C%2Fsvg%3E%0D%0A') 50% 50% / 24px no-repeat rgba(26, 26, 26, 0.8);
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
            /*transition: opacity 0.2s ease-in-out;*/
            opacity: 0;
        }
        &:nth-child(2n) {
            margin-right: 20px;
        }
        &:hover & {
            &__number,
            &__expand,
            &__close {
                opacity: 1;
            }
        }
        &__video {
            background:  rgba(225, 225, 225, .037);
            width: 100%;
            height: calc(100% - 30px);
            iframe {
                width: 100%;
                height: 100%;
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
        &__add {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            background:  url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xml%3Aspace%3D%22preserve%22%20version%3D%221.1%22%20viewBox%3D%220%200%20847%201058.75%22%20x%3D%220px%22%20y%3D%220px%22%3E%3Cpath%20class%3D%22fil0%22%20fill%3D%22%23fff%22%20d%3D%22M356%209c45%2C0%2090%2C0%20134%2C0%2019%2C0%2035%2C15%2035%2C34%200%2C93%200%2C186%200%2C279%2093%2C0%20186%2C0%20278%2C0%2019%2C0%2035%2C16%2035%2C34%200%2C45%200%2C90%200%2C134%200%2C19%20-16%2C35%20-35%2C35%20-92%2C0%20-185%2C0%20-278%2C0%200%2C93%200%2C185%200%2C278%200%2C19%20-16%2C35%20-35%2C35%20-44%2C0%20-89%2C0%20-134%2C0%20-18%2C0%20-34%2C-16%20-34%2C-35%200%2C-93%200%2C-185%200%2C-278%20-93%2C0%20-186%2C0%20-279%2C0%20-19%2C0%20-34%2C-16%20-34%2C-35%200%2C-44%200%2C-89%200%2C-134%200%2C-18%2015%2C-34%2034%2C-34%2093%2C0%20186%2C0%20279%2C0%200%2C-93%200%2C-186%200%2C-279%200%2C-19%2016%2C-34%2034%2C-34z%22%2F%3E%3C%2Fsvg%3E%0A') 50% 50% / 110px no-repeat;
            transition: opacity .4s ease;
            opacity: .12;
            cursor: pointer;
            z-index: 3;
            &--enter,
            &--leave-to {
                opacity: 0;
            }
        }
        &--disabled {
            opacity: .5;
        }
        &--disabled & {
            &__close,
            &__expand {
                display: none;
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
        &-enter,
        &-leave-to {
            top: auto;
            bottom: -30px;
        }
    }
    @media all and (max-width: 768px) {
        .broadcast {
            width: 100%;
            height: calc(30vh - 28px);
            &:first-child {
                height: calc(30vh - 28px);
            }
        }
    }
</style>

<template>
    <div class="sidebar" v-show="sidebarStatus">
        <transition name="sidebar__wrapper-">
            <div class="sidebar__wrapper" v-show="sidebarStatus">
                <div class="sidebar__header">
                    <span class="guide" @click="toggleSidebar"></span>
                </div>
                <div class="sidebar__content sidebar__content--scroll">
                    <div class="sidebar-group">
                        <div class="sidebar-group__title">
                            Тестовый функционал
                        </div>
                        <div class="sidebar-group__item" @click="insertVideo">
                            <span>Показать тестовое видео</span>
                        </div>
                        <div class="sidebar-group__item" @click="openError">
                            <span>Показать ошибку</span>
                        </div>
                    </div>
                </div>
                <div class="sidebar__footer">
                    Ресурс позволяет пользователю одновременно просматривать несколько стримов или видео с YouTube и Twitch.
                </div>
                <div class="sidebar__copyright">
                    © 2018 Levin Pavel, MIT
                </div>
            </div>
        </transition>
        <transition name="sidebar__shadow-">
            <div class="sidebar__shadow" v-show="shadowStatus" @click="toggleSidebar"></div>
        </transition>
    </div>
</template>

<script>
    import { eventEmitter } from '../main.js'
    export default {
        name: "Sidebar",
        data() {
            return {
                sidebarStatus: 0,
                shadowStatus: 0
            }
        },
        methods: {
            toggleSidebar() {
                this.sidebarStatus = !this.sidebarStatus;
                this.shadowStatus = !this.shadowStatus;

                if(this.sidebarStatus) {
                    document.querySelector("html").setAttribute('class','hide-scroll')
                } else {
                    document.querySelector("html").removeAttribute('class')
                }
            },
            insertVideo () { // вставляем видео - тест
                eventEmitter.$emit('urlUpdated') // устанавливаем событие urlUpdated
                this.toggleSidebar()
            },
            openError () { // открываем ошибку - тест
                this.$store.dispatch('setError', {text: 'Пример общей ошибки', index:'main'})
                this.toggleSidebar()
            }
        },
        created () {
            eventEmitter.$on('sidebarStatus', () => { // Прослушиваем событие urlUpdated
                this.toggleSidebar()
            })
        }
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
            max-width: 240px;
            height: 100%;
            font-size: 1.5rem;
            line-height: 1.5rem;
            background-color: rgb(29, 29, 29);
            z-index: 2023;
            &--enter,
            &--leave-to {
                right: -100%;
                &-active {
                    transition: all 0.3s cubic-bezier(.65, .05, .36, 1);
                }
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
            opacity: 1;
            background: $rgba-50;
            z-index: inherit;
            &--enter,
            &--leave-to {
                opacity: 0;
                &-active {
                    transition: opacity 0.3s ease;
                }
            }
        }
    }
</style>

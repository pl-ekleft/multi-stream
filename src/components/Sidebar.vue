<template>
    <div class="sidebar" v-show="sidebarStatus">
        <transition name="sidebar__wrapper-">
            <div class="sidebar__wrapper" v-show="sidebarStatus">

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
        &__wrapper {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 90%;
            max-width: 240px;
            height: 100%;
            background-color: rgb(29, 29, 29);
            z-index: 2023;
            &--enter,
            &--leave-to {
                left: -100%;
                &-active {
                    transition: all 0.3s cubic-bezier(.65, .05, .36, 1);
                }
            }
        }
        &__header {

        }
        &__content {
            flex: 1;
            overflow: hidden;
            &:hover {
                overflow-y: auto;
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
            transition-property: opacity;
            transform: translateZ(0);
            opacity: 1;
            background: rgba(0, 0, 0, 0.5);
            z-index: inherit;
            &--enter,
            &--leave-to {
                opacity: 0;
                &-active {
                    transition: opacity 3s ease;
                }
            }
        }
    }
</style>

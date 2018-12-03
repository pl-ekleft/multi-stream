<template>
    <transition name="error-">
        <div class="error-box" v-show="error.index === index" @mouseenter="closeError">
            <div class="error-box__message" v-html="error.text"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Error",
        props: {
            index: {
                required: true,
                default: ''
            }
        },
        data() {
            return {
                result: {}
            }
        },
        methods: {
            closeError () { // удаляем данные об ошибке
                this.$store.dispatch('clearError')
            }
        },
        computed: {
            error () { // вывод ошибки {{ error }}
                return this.$store.getters.error
            }
        }
    }
</script>

<style lang="scss">
.error {
    &-box {
        position: fixed;
        top: 56px;
        left: 0;
        padding: 5px 15px;
        width: 100%;
        height: 30px;
        text-align: center;
        background: #ff0000;
        box-sizing: border-box;
        transform: translateY(0);
        transition: all .3s ease-in-out;
        z-index: 2000;
        &__message {
            padding-right: 40px;
            color: #fff;
            font-size: 14px;
            line-height: 20px;
        }
    }
    &--enter,
    &--leave-to {
        top: -56px;
        &-active {
            transition: all .3s cubic-bezier(.65, .05, .36, 1);
        }
    }
}
</style>

<template>
  <transition name="error-">
    <div
      v-show="error.index === index"
      class="error-box"
      @mouseenter="closeError"
    >
      <div
        class="error-box__message"
      >
        {{ error.text }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Error',
  props: {
    index: {
      type: Number,
      required: true,
      default: null,
    },
  },
  data () {
    return {
      result: {},
    }
  },
  computed: {
    error () { // вывод ошибки {{ error }}
      return this.$store.getters.error
    },
  },
  methods: {
    closeError () { // удаляем данные об ошибке
      this.$store.dispatch('clearError')
    },
  },
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
        background: $red;
        box-sizing: border-box;
        transition: all .3s ease-in-out;
        z-index: 2000;
        &__message {
            padding-right: 40px;
            color: $rgba-255;
            font-size: 14px;
            line-height: 20px;
        }
    }
    &--enter,
    &--leave-to {
        top: -56px;
    }
}
</style>

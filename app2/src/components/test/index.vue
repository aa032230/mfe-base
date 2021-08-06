<template>
  <div class="test">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      msg: '我是第二个子应用'
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
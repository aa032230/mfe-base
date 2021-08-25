<template>
  <div class="home">
    <Test />
    111111111111111111111
  </div>
</template>

<script>
import { Test } from '@/components'
export default {
  name: 'Home',
  components: { Test },
  created() {
    // console.log(this['__CONTEXT__']);
  }
}
</script>

<style>
.home {
  font-size: 23px;
}
</style>

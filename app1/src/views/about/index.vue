<template>
  <div class="about">
    <anso-date-picker />
  </div>
</template>
<script>
import { ansoDatePicker } from 'comm/src/components'
export default {
  name: 'about',
  components: {
    ansoDatePicker
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

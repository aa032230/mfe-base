<template>
  <div class="cont-title">
    <h3 class="title">{{ title }}</h3>
    <div class="crumb"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: this.$route.meta.name
    }
  },
  components: {},
  computed: {
    // ...mapState(['tabMenus', 'subRouterInfo']),
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss">
.cont-title {
  .title {
    margin: 0;
    padding: 16px 0;
  }
}
</style>

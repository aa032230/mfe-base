<template>
  <div :class="['form-view-box']" ref="formWarp" :style="{height: socureElHeight + 'px'}">
    <section class="form-view" ref="formGroup">
      <div class="form-view-item" v-for="item of formList" :key="item.field">
        <span>{{item.name}}:</span>
        <template v-if="item.type === 'select'">
          <el-select size="small" :style="{ width: item.width ? item.width + 'px' : '150px' }" v-model="form[item.field]">
            <el-option v-for="option of item.options" :key="option.value" :label="option.label" :value="option.value">
            </el-option>
          </el-select>
        </template>
        <template v-else>
          <el-input size="small" v-model="form[item.field]" :style="{ width: item.width ? item.width + 'px' : '150px' }"></el-input>
        </template>
      </div>
    </section>
    <div class="from-view-button-group">
      <el-button size="small">重置</el-button>
      <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
      <span v-if="this.elHeight > 52" @click="handleOpen">展开</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VForm',
  data() {
    return {
      isOpen: false,
      socureElHeight: 52,
      elHeight: 0,
      form: {},
      formList:[
        {
          name: '系统模块',
          field: 'a1'
        },
        {
          name: '系统模块系统模块',
          field: 'a2',
          width: 220,
          type: 'select',
          options: [
            {
              value: 0,
              label: '小籠包'
            },
            {
              value: 1,
              label: '叉烧包'
            }
          ]
        },
        {
          name: '系统模块2',
          field: 'a3',
          width: 220
        },
        {
          name: '系统模块3',
          field: 'a4'
        },
        {
          name: '系统模块4',
          field: 'a5'
        },
      ]
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      const elHeight = this.$refs.formGroup.offsetHeight || 0
      this.elHeight = elHeight
      if (elHeight <= 52) {
        this.socureElHeight = 52
      }
    })
  },
  methods: {
    handleOpen() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.socureElHeight = this.elHeight
      } else {
        this.socureElHeight = 52
      }
    },
    handleQuery() {
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

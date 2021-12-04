<template>
  <div class="transfer-panel">
    <p class="transfer-panel-header">
      <span>{{ title }}</span>
    </p>
    <div :class="['transfer-panel-body', hasFooter ? 'is-with-footer' : '']">
      <el-input
        class="transfer-panel-body-filter"
        v-model="query"
        size="small"
        :placeholder="placeholder"
        v-if="filterable"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="query = ''" v-show="query"></i>
      </el-input>
      <ul
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="transfer-panel-body-list"
      >
        <li v-for="item of filteredData" :key="item[name]" class="transfer-panel-body-list-item">
          <p class="transfer-panel-body-list-item-title">属性1</p>
          <div class="transfer-panel-body-list-item-body">
            <span>标识符：fluewater</span>
            <span>数据类型：int</span>
            <span>访问方式：可写</span>
          </div>
        </li>
      </ul>
      <p class="transfer-panel-body-empty" v-show="hasNoMatch">无匹配数据</p>
      <p class="transfer-panel-body-empty" v-show="data.length === 0 && !hasNoMatch">暂无数据</p>
    </div>
    <p class="transfer-panel-footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'TransferPanel',
  componentName: 'TransferPanel',
  components: {
    // OptionContent: {
    //   props: {
    //     option: Object
    //   },
    //   render(h) {
    //     const getParent = (vm) => {
    //       if (vm.$options.componentName === 'TransferPanel') {
    //         return vm
    //       } else if (vm.$parent) {
    //         return getParent(vm.$parent)
    //       } else {
    //         return vm
    //       }
    //     }
    //     const panel = getParent(this)
    //     const transfer = panel.$parent || panel
    //     return panel.renderContent ? (
    //       panel.renderContent(h, this.option)
    //     ) : transfer.$scopedSlots.default ? (
    //       transfer.$scopedSlots.default({ option: this.option })
    //     ) : (
    //       <span>{this.option[panel.labelProp] || this.option[panel.keyProp]}</span>
    //     )
    //   }
    // }
  },
  props: {
    title: String,
    placeholder: String,
    filterable: Boolean,
    filterMethod: Function,
    defaultChecked: Array,
    props: Object,
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 是否全选
      allChecked: false,
      // 被选中数据
      checked: [],
      query: '',
      checkChangeByUser: true
    }
  },
  computed: {
    checkedSummary() {
      const checkedLength = this.checked.length
      const dataLength = this.data.length
      return `${checkedLength}/${dataLength}`
    },
    hasNoMatch() {
      return this.query.length > 0 && this.filteredData.length === 0
    },
    isIndeterminate() {
      const checkedLength = this.checked.length
      return checkedLength > 0 && checkedLength < this.checkableData.length
    },
    hasFooter() {
      return !!this.$slots.default
    },
    keyProp() {
      return this.props.key || 'key'
    },
    labelProp() {
      return this.props.label || 'label'
    },
    disabledProp() {
      return this.props.disabled || 'disabled'
    },
    filteredData() {
      return this.data.filter((item) => {
        if (typeof this.filterMethod === 'function') {
          return this.filterMethod(this.query, item)
        } else {
          const label = item[this.labelProp] || item[this.keyProp].toString()
          return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1
        }
      })
    },
    checkableData() {
      return this.filteredData.filter((item) => !item[this.disabledProp])
    }
  },
  watch: {
    checked(val, oldVal) {
      this.updateAllChecked()
      if (this.checkChangeByUser) {
        const movedKeys = val.concat(oldVal).filter((v) => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1)
        this.$emit('checked-change', val, movedKeys)
      } else {
        this.$emit('checked-change', val)
        this.checkChangeByUser = true
      }
    },

    data() {
      const checked = []
      const filteredDataKeys = this.filteredData.map((item) => item[this.keyProp])
      this.checked.forEach((item) => {
        if (filteredDataKeys.indexOf(item) > -1) {
          checked.push(item)
        }
      })
      this.checkChangeByUser = false
      this.checked = checked
    },

    checkableData() {
      this.updateAllChecked()
    },

    defaultChecked: {
      immediate: true,
      handler(val, oldVal) {
        if (oldVal && val.length === oldVal.length && val.every((item) => oldVal.indexOf(item) > -1)) return
        const checked = []
        const checkableDataKeys = this.checkableData.map((item) => item[this.keyProp])
        val.forEach((item) => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item)
          }
        })
        this.checkChangeByUser = false
        this.checked = checked
      }
    }
  },
  methods: {
    handleAllCheckedChange(value) {
      this.checked = value ? this.checkableData.map((item) => item[this.keyProp]) : []
    },
    updateAllChecked() {
      const checkableDataKeys = this.checkableData.map((item) => item[this.keyProp])
      this.allChecked =
        checkableDataKeys.length > 0 && checkableDataKeys.every((item) => this.checked.indexOf(item) > -1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
>

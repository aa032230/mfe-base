<template>
  <div class="allselect">
    <el-select v-model="bindValue" size="small" multiple collapse-tags   filterable clearable :placeholder="placeholder">
      <div class="allselect-search">
        <el-input v-model="filterText" size="small" placeholder="请输入"></el-input>
      </div>
      <el-option style="padding:0; height: auto;" value="all" >
        <span class="option" @click.stop="setAll">{{ allFlag }}</span>
      </el-option>
      <el-option
        v-for="item in options"
        :key="valueCompute(item)"
        :label="labelCompute(item)"
        :value="valueCompute(item)"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    options: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: ''
    }
  },
  computed: {
    valueCompute() {
      return (item) => {
        if (this.valueKey) {
          return item[this.valueKey]
        } else {
          return item
        }
      }
    },
    labelCompute() {
      return (item) => {
        if (this.labelKey) {
          return item[this.labelKey]
        } else {
          return item
        }
      }
    }
  },
  watch: {
    bindValue(val) {
      if (val.length === 0) {
        this.allFlag = '全选'
      }
      if (val.length === this.options.length) {
        this.allFlag = '全不选'
      }
      this.$emit('input', val)
    }
  },
  data() {
    return {
      bindValue: this.value,
      allFlag: '全选',
      filterText: ''
    }
  },
  methods: {
    setAll() {
      if (this.allFlag === '全选') {
        this.allFlag = '全不选'
        this.bindValue = this.valueKey ? this.options.map((item) => item[this.valueKey]) : this.options
      } else {
        this.allFlag = '全选'
        this.bindValue = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.allselect {
  margin: 20px;
}
.option {
  user-select: none;
  display: block;
  font-size: 14px;
  margin: 0 20px;
  border-bottom: 1px solid #e5e5e5;
  height: auto;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: #f5f7fa;
  }
}
::v-deep .el-select__tags-text {
  display: inline-block;
  max-width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
::v-deep .el-tag.el-tag--info .el-tag__close {
  top: -5px;
  right: -4px;
}
::v-deep.el-select-dropdown__item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &::after {
    right: 10px !important;
  }
}
.allselect-search{
  padding: 10px 16px;
}
</style>

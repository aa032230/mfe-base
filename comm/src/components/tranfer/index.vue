<template>
  <div class="transfer">
    <transfer-panel
      :data="data"
      :props="props"
      title="我是标题"
      filterable
      :default-checked="defaultChecked"
    ></transfer-panel>
  </div>
</template>

<script>
import TransferPanel from './transferPanel'
export default {
  name: 'transfer',
  components: {
    TransferPanel
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          key: 'key',
          disabled: 'disabled'
        }
      }
    },
    defaultChecked: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      leftChecked: [],
      rightChecked: []
    }
  },
  methods: {
    onSourceCheckedChange(val, movedKeys) {
      this.leftChecked = val
      if (movedKeys === undefined) return
      this.$emit('left-check-change', val, movedKeys)
    },

    onTargetCheckedChange(val, movedKeys) {
      this.rightChecked = val
      if (movedKeys === undefined) return
      this.$emit('right-check-change', val, movedKeys)
    },

    addToLeft() {
      let currentValue = this.value.slice()
      this.rightChecked.forEach((item) => {
        const index = currentValue.indexOf(item)
        if (index > -1) {
          currentValue.splice(index, 1)
        }
      })
      this.$emit('input', currentValue)
      this.$emit('change', currentValue, 'left', this.rightChecked)
    },

    addToRight() {
      let currentValue = this.value.slice()
      const itemsToBeMoved = []
      const key = this.props.key
      this.data.forEach((item) => {
        const itemKey = item[key]
        if (this.leftChecked.indexOf(itemKey) > -1 && this.value.indexOf(itemKey) === -1) {
          itemsToBeMoved.push(itemKey)
        }
      })
      currentValue =
        this.targetOrder === 'unshift' ? itemsToBeMoved.concat(currentValue) : currentValue.concat(itemsToBeMoved)
      this.$emit('input', currentValue)
      this.$emit('change', currentValue, 'right', this.leftChecked)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
>

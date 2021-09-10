import dayjs from 'dayjs'
export default function setPickOptions(vm) {
  const _options = {
    shortcuts: [
      {
        text: '最近一周',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end], true)
          vm.prefixText = this.text
        }
      },
      {
        text: '最近一个月',
        onClick(picker) {
          console.log(picker)
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end], true)
          vm.prefixText = this.text
        }
      },
      {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end], true)
          vm.prefixText = this.text
        }
      },

    ]
  }
  return _options
}

import moduleName from 'vue'
export const CLOUMN = [
  {
    type: 'selection',
    width: '55'
  },
  {
    prop: 'date',
    label: '日期11',
    sortable: true,
    format: 'YYYY-MM-DD HH:mm:ss'
  },
  {
    prop: 'name',
    label: '姓名',
    width: '50px',
    'show-overflow-tooltip': true
  },
  {
    prop: 'address',
    label: '地址',
    custom: true
  },
  {
    prop: 'title',
    label: '地址1',
    render: (scope, prop) => {
      return (
        <el-image
          style="width: 50px;"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></el-image>
      )
    }
  },
  {
    prop: 'hh3',
    label: '地址3'
  }
]

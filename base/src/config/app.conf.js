/* 应用配置 */

export const NAVBAR_MENUS = [
  {
    name: 'app1',
    entry: '//localhost:9991',
    activeRule: 'app1',
    title: '应用一',
    children: [
      {
        name: '菜单一',
        index: '/app1/home',
        icon: 'el-icon-menu',
        permissionsName: ''
      },
      {
        name: '菜单二',
        index: '/app1/about',
        icon: 'el-icon-menu',
        permissionsName: ''
      }
    ]
  },
  {
    name: 'app2',
    entry: '//localhost:9992',
    activeRule: 'app2',
    title: '应用二',
    children: [
      {
        name: '菜单一',
        index: '/app2/home',
        icon: 'el-icon-menu',
        permissionsName: ''
      },
      {
        name: '菜单二',
        index: '/app2/about',
        icon: 'el-icon-menu',
        permissionsName: ''
      }
    ]
  }
]
// export function asyncApps() {
//   return new Promise((resolve, reject) => {

//     resolve(navbar_menus)
//   })
// }
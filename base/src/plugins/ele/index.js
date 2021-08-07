import {
  Autocomplete, Avatar, Button, Breadcrumb, BreadcrumbItem, Backtop,
  Checkbox, Dropdown, DropdownMenu, DropdownItem, Icon, Input, Loading,
  Menu, MenuItem, Submenu, Select, Option, Tooltip, Tag, Tree, MessageBox,
  Notification, Message, Container, Header, Aside, Main, Row, Col
} from 'element-ui'
export default {
  components: [
    Autocomplete,
    Avatar,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Backtop,
    Checkbox,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Input,
    Loading,
    Menu,
    MenuItem,
    Submenu,
    Select,
    Option,
    Tooltip,
    Tag,
    Tree,
    Container,
    Header,
    Aside,
    Main,
    Row,
    Col
  ],
  install(Vue) {
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$notify = Notification
    Vue.prototype.$message = Message
  }
}

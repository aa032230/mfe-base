import {
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
  MessageBox,
  Notification,
  Message,
  Switch,
  Form,
  FormItem,
  Table,
  TableColumn,
  Popover,
  CheckboxGroup,
  Pagination,
  Dialog,
  Popconfirm,
  RadioGroup,
  Radio,
  Image,
  Col,
  Row,
  DatePicker,
  Scrollbar
} from 'element-ui'
export default {
  components: [
    Autocomplete,
    Avatar,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Backtop,
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
    Switch,
    Form,
    FormItem,
    Table,
    TableColumn,
    Tooltip,
    Popover,
    CheckboxGroup,
    Checkbox,
    Pagination,
    Dialog,
    Popconfirm,
    RadioGroup,
    Radio,
    Image,
    Row,
    Col,
    DatePicker,
    
  ],
  install(Vue) {
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$notify = Notification
    Vue.prototype.$message = Message
    Vue.use(Scrollbar)
  }
}

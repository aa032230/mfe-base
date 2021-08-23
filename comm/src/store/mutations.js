import { SET_FORM_VALUE } from './types'

export default {
  // form表单设置
  [SET_FORM_VALUE](state, payload) {
    state.form  = Object.assign(state.form,payload)
  }
}

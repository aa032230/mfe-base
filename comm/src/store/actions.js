import { SET_FORM_VALUE } from './types'

export default {
  // form表单设置
  setFormValue(context, payload) {
    context.commit(SET_FORM_VALUE, payload)
  }
}

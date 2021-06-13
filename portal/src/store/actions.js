import { TEST_MODULE } from './types'

export default {
  dispatchAction(context, payload) {
    context.commit(TEST_MODULE.ACTIONS, payload)
  }
}

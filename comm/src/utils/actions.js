function emptyAction () {}

export default class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction
  };

  static setActions (actions) {
    this.actions = actions
  }

  static onGlobalStateChange (...args) {
    return this.actions.onGlobalStateChange(...args)
  }

  static setGlobalState (...args) {
    return this.actions.setGlobalState(...args)
  }
}

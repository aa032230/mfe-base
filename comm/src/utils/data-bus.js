const _events = require('events')
// 发布订阅
export const DataBus = (function () {
    const _emitter = new _events()

    function on(type, handler) {
        _emitter.on(type, handler)
    }

    function emit(type, data) {
        _emitter.emit(type, data)
    }

    function off(type) {
        const handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () { }
        _emitter.off(type, handler)
    }
    return {
        on,
        emit,
        off,
    }
})()
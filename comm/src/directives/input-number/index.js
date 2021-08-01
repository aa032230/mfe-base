import { onInput } from '../../utils';
/**
 *  限制只能输入纯数字
 *  v-input-number 纯数字
 *  v-input-number.float="2" // 保留2位小数
 *  
 */
export default {
    update(el, binding, vnode) {
        const ele = el.tagName === 'INPUT' ? el : el.querySelector('input');
        if (ele) {
            ele.addEventListener('input', onInput(ele, binding, vnode));
        }
    },
    unbink(el, binding, vnode) {
        const ele = el.tagName === 'INPUT' ? el : el.querySelector('input');
        if (ele) {
            ele.removeEventListener('input', onInput(ele, binding, vnode));
        }
    }
}
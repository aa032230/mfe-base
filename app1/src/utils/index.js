export const startup = require('./startup').default
import { name } from '../../package'
export const mfc = window.__MF_CONFIG__
export const base = mfc && mfc[name] ? mfc[name].activeBase : process.env.BASE_URL


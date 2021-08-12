import { http } from 'comm/src/utils'
import api from 'config/api.conf'

export const login = (params) => http.get(api.xxx, params)

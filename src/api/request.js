import axios from 'axios'
import showMessage from '../utils/showMessage'

const ins = axios.create({
    timeout: 5000
})

ins.interceptors.response.use(resp => {
    if (resp.data.code !== 0) {
        showMessage({
            content: resp.data.msg,
            type: 'danger',
            duration: 1500
        })
        return null
    }
    return resp.data.data
})

export default ins
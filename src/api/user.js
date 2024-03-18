import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get'
  })
}

export function updateInfo(userInfo) {
  return request({
    url: '/api/admin',
    method: 'put',
    data: userInfo
  })
}

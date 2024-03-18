import request from '@/utils/request'

export function getAbout() {
  return request({
    url: '/api/about',
    method: 'get'
  })
}

export function postAbout(data) {
  return request({
    url: '/api/about',
    method: 'post',
    data
  })
}

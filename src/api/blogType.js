import request from '@/utils/request'

export function getBlogType() {
  return request({
    url: '/api/blogtype',
    method: 'get'
  })
}

export function getOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get'
  })
}

// data:{name, order}
export function addBlogType(data) {
  return request({
    url: `/api/blogtype`,
    method: 'post',
    data
  })
}

export function editBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  })
}

export function delBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete'
  })
}

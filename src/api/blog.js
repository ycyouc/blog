import request from '@/utils/request'

export function getBlogs(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

// 删除单个文章
export function deleteBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}

// 发布文章
export function postBlog(data) {
  return request({
    url: `/api/blog/`,
    method: 'post',
    data
  })
}

// 获取单个文章
export function getOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}

// 修改文章
export function editBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: 'put',
    data: blogInfo.data
  })
}

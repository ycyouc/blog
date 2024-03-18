import request from './request'

export async function getBlogCategory() {
    return await request.get('/api/blogtype')
}
export async function getBlog(page = 1, limit = 10, categoryid = -1, keyword = '') {
    return await request.get('/api/blog', {
        params: {
            page,
            limit,
            categoryid,
            keyword
        }
    })
}

export async function getSingleBlog(id) {
    return await request.get(`/api/blog/${id}`)
}


/**
 * 提交评论
 * @param {nickname: "昵称", content: "评论内容，纯文本", blogId: <id>} commentInfo 
 * @returns 
 * 
 */
export async function postComment(commentInfo) {
    return await request.post(`/api/comment`, commentInfo)
}

export async function getComments(blogid, page = 1, limit = 10) {
    return await request.get(`/api/comment`, {
        params: {
            blogid,
            page,
            limit
        }
    })
}

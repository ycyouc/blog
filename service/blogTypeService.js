const { addBlogTypeDao, findAllBlogTypeDao, findOneBlogTypeDao, updateBlogTypeDao, deleteBlogTypeDao } = require("../dao/blogTypeDao")
const { ValidationError } = require("../utils/errors")
const { handleDataPattern, formatResponse } = require('../utils/tool')
const validate = require('validate.js')

// 添加博客分类
module.exports.addBlogTypeService = async function (newBlogTypeInfo) {
    // 数据验证规则
    const blogTypeRule = {
        name: {
            presence: {
                allowEmpty: false
            },
            type: 'string'
        },
        order: {
            presence: {
                allowEmpty: false
            },
            type: 'string'
        }
    }
    // 数据验证
    const validateResult = validate.validate(newBlogTypeInfo, blogTypeRule)
    if (!validateResult) {
        // 验证通过
        newBlogTypeInfo.articleCount = 0    // 因为是新增的文章分类 所以一开始为0
        return formatResponse(0, "", await addBlogTypeDao(newBlogTypeInfo))
    } else {
        throw new ValidationError('数据验证失败')
    }
}

// 获取博客分类
module.exports.findAllBlogTypeService = async function () {
    const data = await findAllBlogTypeDao()
    const obj = formatResponse(0, "", handleDataPattern(data))
    obj.data.sort((a, b) => a.order - b.order)
    return obj
}

// 获取其中一个博客分类
module.exports.findOneBlogTypeService = async function (id) {
    return formatResponse(0, "", await findOneBlogTypeDao(id));
}

// 修改其中一个博客分类
module.exports.updateBlogTypeService = async function (id, blogInfo) {
    return formatResponse(0, "", await updateBlogTypeDao(id, blogInfo));
}

// 删除其中一个博客分类
module.exports.deleteBlogTypeService = async function (id) {
    await deleteBlogTypeDao(id);
    // 这里需要返回受影响的文章的数据，写了文章模块后再回来修改
    return formatResponse(0, "", true);
}

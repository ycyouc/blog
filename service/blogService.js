const { addBlogToType } = require("../dao/blogTypeDao")
const { addBlogDao, findAllBlogDao, findOneBlogDao, updateBlogDao, deleteBlogDao, getBlogByPageDao } = require("../dao/blogDao")
const blogTypeModel = require("../dao/model/blogTypeModel")
const { ValidationError } = require("../utils/errors")
const { handleDataPattern, formatResponse, handleTOC } = require('../utils/tool')
const validate = require('validate.js')

// 扩展验证规则
validate.validators.categoryIdIsExist = async function (value) {
    const blogTypeInfo = blogTypeModel.findByPk(value)
    if (blogTypeInfo) {
        return
    }
    return "CategoryId Is Not Exist"
}

// 添加博客
module.exports.addBlogService = async function (newBlogInfo) {
    // 首先第一个要处理的就是 TOC

    newBlogInfo = handleTOC(newBlogInfo)

    newBlogInfo.toc = JSON.stringify(newBlogInfo.toc)


    // 初始化信息
    newBlogInfo.scanNumber = 0
    newBlogInfo.commentNumber = 0

    // 验证
    const blogRule = {
        title: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        description: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        toc: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        htmlContent: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        thumb: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        scanNumber: {
            presence: {
                allowEmpty: false
            },
            type: "integer"
        },
        commentNumber: {
            presence: {
                allowEmpty: false
            },
            type: "integer"
        },
        createDate: {
            presence: {
                allowEmpty: false
            },
            type: "integer"
        },
        categoryId: {
            presence: true,
            type: "integer",
            categoryIdIsExist: true
        }
    }
    try {
        await validate.async(newBlogInfo, blogRule)
        const data = await addBlogDao(newBlogInfo)
        await addBlogToType(newBlogInfo.categoryId)
        return formatResponse(0, "", data)
    } catch (err) {
        throw new ValidationError("数据验证失败")
    }
}

// 分页获取博客
module.exports.getBlogByPageService = async function (pageInfo) {
    const data = await getBlogByPageDao(pageInfo)
    const rows = handleDataPattern(data.rows)
    rows.forEach(it => {
        it.toc = JSON.parse(it.toc)
    })
    return formatResponse(0, "", {
        "total": data.count,
        "rows": rows
    })

}

// 获取其中一个博客
module.exports.findOneBlogService = async function (id, auth) {
    const data = await findOneBlogDao(id)
    data.dataValues.toc = JSON.parse(data.dataValues.toc)
    if (!auth) {
        data.dataValues.scanNumber++
        await data.save()
    }
    return formatResponse(0, "", data.dataValues)
}

// 修改其中一个博客
module.exports.updateBlogService = async function (id, newBlogInfo) {
    // 首先判断正文内容有没有改变，因为正文内容的改变会影响 TOC
    if (newBlogInfo.htmlContent) {
        // 进入此 if，说明文章的正文内容有所改变，需要重新处理 TOC 目录
        newBlogInfo = handleTOC(newBlogInfo)

        newBlogInfo.toc = JSON.stringify(newBlogInfo.toc)
    }
    return formatResponse(0, "", await updateBlogDao(id, newBlogInfo))
}

// 删除其中一个博客
module.exports.deleteBlogService = async function (id) {
    await deleteBlogDao(id)
    return formatResponse(0, "", true)
}

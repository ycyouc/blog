const blogModel = require('./model/blogModel')
const blogTypeModel = require('./model/blogTypeModel')

// 添加博客
module.exports.addBlogDao = async function (newBlogInfo) {
    const { dataValues } = await blogModel.create(newBlogInfo)
    return dataValues
}



// 获取博客
module.exports.getBlogByPageDao = async function (pageInfo) {
    if (pageInfo.categoryId && pageInfo.categoryId !== '-1') {
        // 按条件查找
        return await blogModel.findAndCountAll({
            include: {
                model: blogTypeModel,
                as: 'category',
                where: {
                    id: pageInfo.categoryId
                }
            },
            offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
            limit: pageInfo.limit * 1
        })
    } else {
        // id=-1 查找所有
        return await blogModel.findAndCountAll({
            include: {
                model: blogTypeModel,
                as: 'category'
            },
            offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
            limit: pageInfo.limit * 1
        })
    }
}

// 获取其中一个博客
module.exports.findOneBlogDao = async function (id) {
    return await blogModel.findByPk(id)
}

// 修改其中一个博客
module.exports.updateBlogDao = async function (id, newBlogInfo) {
    await blogModel.update(newBlogInfo, {
        where: {
            id
        }
    })
    const { dataValues } = await blogModel.findByPk(id)
    return dataValues
}

// 删除其中一个博客
module.exports.deleteBlogDao = async function (id) {
    return await blogModel.destroy({
        where: {
            id
        }
    })
}

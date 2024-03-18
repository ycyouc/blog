// 负责对数据集进行初始化操作
const adminModel = require('./model/adminModel')
const bannerModel = require('./model/bannerModel')
const blogModel = require('./model/blogModel')
const blogTypeModel = require('./model/blogTypeModel')
const sequelize = require('./dbConnect')
const md5 = require('md5');
// 同步完成后有一些表需要初始化数据
(async function () {

    // 表关系
    blogTypeModel.hasMany(blogModel, { foreignKey: 'categoryId', targetKey: "id" })
    blogModel.belongsTo(blogTypeModel, { foreignKey: 'categoryId', targetKey: "id", as: "category" })

    await sequelize.sync({
        alter: true
    })
    const adminCount = await adminModel.count()
    if (!adminCount) {
        await adminModel.create({
            loginId: 'admin',
            name: '超级管理员',
            loginPwd: md5('123456')
        })
        console.log('初始化管理员数据完毕...')
    }
    const bannerCount = await bannerModel.count()
    if (!bannerCount) {
        await bannerModel.bulkCreate([{
            "midImg": "/static/images/img28.jpg",
            "bigImg": "/static/images/img28.jpg",
            "title": "塞尔达旷野之息",
            "description": "2017年年度游戏，期待续作"
        }, {
            "midImg": "/static/images/img29.jpg",
            "bigImg": "/static/images/img29.jpg",
            "title": "塞尔达四英杰",
            "description": "四英杰里面你最喜欢的又是谁呢"
        }, {
            "midImg": "/static/images/img30.jpg",
            "bigImg": "/static/images/img30.jpeg",
            "title": "日本街道",
            "description": "动漫中经常出现的日本农村街道，一份独特的恬静"
        }, {
            "midImg": "/static/images/img31.jpg",
            "bigImg": "/static/images/img31.jpeg",
            "title": "塞尔达四英杰",
            "description": "动漫中经常出现的日本农村街道，一份独特的恬静"
        }])
        console.log('初始化标题数据完毕...')
    }
    console.log('数据库数据已准备完毕...')
})()

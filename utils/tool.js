const jwt = require('jsonwebtoken')
const md5 = require('md5')
const multer = require('multer')
const path = require('path')
const toc = require('markdown-toc')

// 格式化响应的数据
module.exports.formatResponse = function (code, msg, data) {
    return {
        "code": code,
        "msg": msg,
        "data": data
    }
}

// 解析token
module.exports.analysisToken = function (token) {
    return jwt.verify(token.split(' ')[1], md5(process.env.JWT_SECRET))
}

// 处理数组类型的响应数据
module.exports.handleDataPattern = function (data) {
    const arr = []
    for (const value of data) {
        arr.push(value.dataValues)
    }
    return arr
}

const storage = multer.diskStorage({
    // 文件存储位置
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/static/uploads')
    },
    // 上传到服务器的文件 文件名单独处理
    filename: function (req, file, cb) {
        const basename = path.basename(file.originalname, path.extname(file.originalname))
        const extname = path.extname(file.originalname)
        const newName = basename + new Date().getTime() + Math.floor(Math.random() * 9000 + 1000) + extname
        cb(null, newName)
    }
})

module.exports.uploading = multer({
    storage: storage,
    limits: {
        fileSize: 4000000,
        files: 1
    }
})

// 处理toc
module.exports.handleTOC = function (info) {
    const result = toc(info.markdownContent).json

    function transfer(flatArr) {
        const stack = []
        const result = []

        // 创建对象
        function createTOCItem(item) {
            return {
                name: item.content,
                anchor: item.slug,
                level: item.lvl,
                children: []
            }
        }

        function handleItem(item) {
            const top = stack[stack.length - 1]
            if (!top) {
                stack.push(item)
            } else if (top.level >= item.level) {
                stack.pop()
                handleItem(item)
            } else {
                top.children.push(item)
                stack.push(item)
            }
        }

        // 寻找最小的min
        let min = 6
        for (const i of flatArr) {
            if (i.lvl < min) {
                min = i.lvl
            }
        }

        for (const it of flatArr) {
            const tocItem = createTOCItem(it)
            if (tocItem.level === min) {
                result.push(tocItem)
            }
            handleItem(tocItem)
        }

        return result
    }

    info.toc = transfer(result)
    delete info.markdownContent

    // 为各个级别的标题添加level
    for (const i of result) {
        switch (i.lvl) {
            case 1: {
                const newStr = `<h1 id="${i.slug}">`
                info.htmlContent = info.htmlContent.replace('<h1>', newStr)
                break
            }
            case 2: {
                const newStr = `<h2 id="${i.slug}">`
                info.htmlContent = info.htmlContent.replace('<h2>', newStr)
                break
            }
            case 3: {
                const newStr = `<h3 id="${i.slug}">`
                info.htmlContent = info.htmlContent.replace('<h3>', newStr)
                break
            }
            case 4: {
                const newStr = `<h4 id="${i.slug}">`
                info.htmlContent = info.htmlContent.replace('<h4>', newStr)
                break
            }
            case 5: {
                const newStr = `<h5 id="${i.slug}">`
                info.htmlContent = info.htmlContent.replace('<h5>', newStr)
                break
            }
            case 6: {
                const newStr = `<h6 id="${i.slug}">`
                info.htmlContent = info.htmlContent.replace('<h6>', newStr)
                break
            }

        }
    }

    return info
}


// [
//     { content: '概述', slug: '概述', lvl: 1, i: 0, seen: 0 },
//     { content: '简单请求', slug: '简单请求', lvl: 1, i: 1, seen: 0 },
//     { content: '简单请求的判定', slug: '简单请求的判定', lvl: 2, i: 2, seen: 0 },
//     { content: '简单请求的交互规范', slug: '简单请求的交互规范', lvl: 2, i: 3, seen: 0 },
//     { content: '需要预检的请求', slug: '需要预检的请求', lvl: 1, i: 4, seen: 0 },
//     { content: '附带身份凭证的请求', slug: '附带身份凭证的请求', lvl: 1, i: 5, seen: 0 },
//     { content: '一个额外的补充', slug: '一个额外的补充', lvl: 1, i: 6, seen: 0 }
//   ]

// [
//     {
//         "name": "章节1",
//         "anchor": "title-1"
//     },
//     {
//         "name": "章节2",
//         "anchor": "title-2",
//         "children": [
//             {
//                 "name": "章节2-1",
//                 "anchor": "title-2-1"
//             },
//             {
//                 "name": "章节2-2",
//                 "anchor": "title-2-2"
//             }
//         ]
//     }
// ]


var express = require('express')
const { addBlogService, getBlogByPageService, findOneBlogService, updateBlogService, deleteBlogService } = require('../service/blogService')
var router = express.Router()

// 添加博客
router.post("/", async function (req, res, next) {
    res.send(await addBlogService(req.body))
})

// 分页获取博客
router.get("/", async function (req, res, next) {
    res.send(await getBlogByPageService(req.query))
})

// 获取其中一个博客
router.get("/:id", async function (req, res, next) {
    res.send(await findOneBlogService(req.params.id, req.headers.authorization))
})

// 修改其中一个博客
router.put("/:id", async function (req, res, next) {
    res.send(await updateBlogService(req.params.id, req.body))
})

// 删除其中一个博客
router.delete("/:id", async function (req, res, next) {
    res.send(await deleteBlogService(req.params.id))
})

module.exports = router

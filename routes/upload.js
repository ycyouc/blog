const express = require('express')
const router = express.Router()
const { uploading, formatResponse } = require('../utils/tool')
const { UploaderError } = require('../utils/errors')
const multer = require('multer')

// single方法书写上传控件的name值
router.post('/', function (req, res, next) {
    uploading.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            next(new UploaderError('上传文件失败，请检查文件的大小，控制在4MB以内'))
        }
        const path = "/static/uploads/" + req.file.filename
        res.send(formatResponse(0, "", path))
    })
})

module.exports = router

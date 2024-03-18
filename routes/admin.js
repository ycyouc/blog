var express = require('express')
var router = express.Router()
const { loginService, updateAdminService } = require('../service/adminService')
const { formatResponse, analysisToken } = require('../utils/tool')
const { ValidationError } = require('../utils/errors')

/* 登录 */
router.post('/login', async function (req, res, next) {
  // 验证验证码
  if(req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    throw new ValidationError('验证码错误')
  }
  // 验证码通过
  const result = await loginService(req.body)
  if (result.token) {
    res.setHeader('authentication', result.token)
  }
  res.send(formatResponse(0, "", result.data))
})

// whoami
router.get('/whoami', async function(req, res, next) {
  const token = analysisToken(req.get('Authorization'))
  res.send(formatResponse(0, "", {
    "loginId": token.loginId,
    "name": token.name,
    "id": token.id
  }))
})

// 更新
router.put('/', async function(req, res, next) {
  const result = await updateAdminService(req.body)
  res.send(result)
})

module.exports = router

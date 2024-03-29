var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var { expressjwt: jwt } = require("express-jwt")
const md5 = require('md5')
const { ForbiddenError, ServiceError, UnknownError } = require('./utils/errors')
const session = require('express-session')


// 默认读取项目根目录下的 .env 环境变量文件
require('dotenv').config()
// 引入数据库连接
require('./dao/db')
require("express-async-errors");

// 引入路由
var adminRouter = require('./routes/admin')
var bannerRouter = require('./routes/banner')
var uploadRouter = require('./routes/upload')
var captchaRouter = require('./routes/captcha')
var blogTypeRouter = require('./routes/blogType')
var blogRouter = require('./routes/blog')

// 创建服务器实例
var app = express()

// session中间件
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

// 使用中间件
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// 配置验证 token 接口
app.use(jwt({
  secret: md5(process.env.JWT_SECRET), // 我们所设置的秘钥
  algorithms: ['HS256'], // 新版本的 expressJWT 必须要求指定算法
}).unless({
  // 需要排除的 token 验证的路由
  path: [
    { "url": "/api/admin/login", methods: ["POST"] },
    { "url": "/res/captcha", methods: ["GET"] }
  ]
}))

// 使用路由中间件
app.use('/api/admin', adminRouter)
app.use('/api/banner', bannerRouter)
app.use('/api/upload', uploadRouter)
app.use('/res/captcha', captchaRouter)
app.use('/api/blogtype', blogTypeRouter)
app.use('/api/blog', blogRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.log(err.name, err.message)
  if (err.name === "UnauthorizedError") {
    // 说明token验证错误
    res.send(new ForbiddenError("未登录，或者登录已经过期").toResponseJSON())
  } else if(err instanceof ServiceError) {
    res.send(err.toResponseJSON())
  } else {
    res.send(new UnknownError().toResponseJSON())
  }
})

module.exports = app

// admin 模块的业务逻辑层
const { loginDao, updateDao } = require('../dao/adminDao')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { formatResponse } = require('../utils/tool')
const { ValidationError } = require('../utils/errors')

// 登录
module.exports.loginService = async function (loginInfo) {
    loginInfo.loginPwd = md5(loginInfo.loginPwd)
    // 验证数据
    let data = await loginDao(loginInfo)
    if (data && data.dataValues) {
        // 添加token
        data = {
            id: data.dataValues.id,
            loginId: data.dataValues.loginId,
            name: data.dataValues.name
        }
        let rememberPeriod = null
        if (data.remember) {
            rememberPeriod = parseInt(data.remember)
        } else {
            rememberPeriod = 1
        }
        const token = jwt.sign({
            id: data.id,
            loginId: data.loginId,
            name: data.name
        }, md5(process.env.JWT_SECRET), { expiresIn: 60 * 60 * 24 * rememberPeriod })
        return { token, data }
    }
    return { data }
}

// 更新
module.exports.updateAdminService = async function (accountInfo) {
    // 根据传入的账号信息查询对应的用户
    const data = await loginDao({
        loginId: accountInfo.loginId,
        loginPwd: md5(accountInfo.oldLoginPwd)
    })
    // 有用户信息和没有用户信息
    if (data && data.dataValues) {
        // 查询成功
        await updateDao({
            name: accountInfo.name,
            loginId: accountInfo.loginId,
            loginPwd: md5(accountInfo.loginPwd)
        })
        return formatResponse(0, "", {
            "loginId": accountInfo.loginId,
            "name": accountInfo.name,
            "id": data.dataValues.id
        })
    } else {
        // 查询失败
        throw new ValidationError('旧密码不正确')
    }
}

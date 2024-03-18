// 负责和数据库打交道
const adminModel = require('./model/adminModel')

module.exports.loginDao = async function(loginInfo) {
    // 查询
    return await adminModel.findOne({
        where: {
            loginId: loginInfo.loginId,
            loginPwd: loginInfo.loginPwd
        }
    })
}

// 更新
module.exports.updateDao = async function(newAccountInfo) {
    return await adminModel.update(newAccountInfo, {
        where: {
            loginId: newAccountInfo.loginId
        }
    })
}

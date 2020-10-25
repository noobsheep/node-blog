const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const userHandle = (req, res) => {
    // 登录接口
    if (req.method === 'POST' && req.path === '/api/user/login') {
        const loginInfo = login(req.body.username, req.body.password)
        return loginInfo.then((result) => {
            if (result) {
                return new SuccessModel('认证成功')
            } else {
                return new ErrorModel('认证失败')
            }
        }).catch((err) => {
            return new ErrorModel(err.sqlMessage)
        })
    }
}

module.exports = userHandle
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const userHandle = (req, res) => {
    // 登录接口
    if (req.method === 'POST' && req.path === '/api/user/login') {
        const loginInfo = login(req.body.username, req.body.password)
        if (loginInfo) {
            return new SuccessModel('就是想挽挽挽挽,真可怜')
        } else {
            return new ErrorModel('认证失败')
        }
    }
}

module.exports = userHandle
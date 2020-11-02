const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { setCookieExpires } = require('../utils/utils')

const userHandle = (req, res) => {
    // 登录接口
    if (req.method === 'GET' && req.path === '/api/user/login') {
        // const loginInfo = login(req.body.username, req.body.password)
        const loginInfo = login(req.query.username, req.query.password)
        return loginInfo.then((result) => {
            if (result) {
                req.session.username = result.username
                req.session.realname = result.realname
                // 操作cookie
                // res.setHeader('Set-Cookie', `token=${result.realname};path=/;expires=${setCookieExpires(7)}; httpOnly`)
                return new SuccessModel('认证成功')
            } else {
                return new ErrorModel('认证失败')
            }
        }).catch((err) => {
            return new ErrorModel(err.sqlMessage || err.message)
        })
    }

    // 新定义验证登录接口
    if (req.method === 'GET' && req.path === '/api/user/loginCheck') {
        return new Promise((resolve, reject) => {
            if (req.session.username) {
                resolve(new SuccessModel(req.session))
            } else {
                resolve(new ErrorModel('未登录'))
            }
        }).catch((err) => {
            return new ErrorModel(err.sqlMessage || err.message)
        })
    }
}

module.exports = userHandle
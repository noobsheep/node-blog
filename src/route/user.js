const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 整个获取 expires 的方法
const setCookieExpires = (day) => {
    const nowTime = new Date()
    nowTime.setTime(nowTime.getTime() + (day * 24 * 60 * 60 * 1000))
    return nowTime.toUTCString()
}

const userHandle = (req, res) => {
    // 登录接口
    if (req.method === 'GET' && req.path === '/api/user/login') {
        // const loginInfo = login(req.body.username, req.body.password)
        const loginInfo = login(req.query.username, req.query.password)
        return loginInfo.then((result) => {
            if (result) {
                // 操作cookie
                res.setHeader('Set-Cookie', `token=${result.realname};path=/;expires=${setCookieExpires(7)}; httpOnly`)
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
            if (req.cookie.token) {
                resolve(new SuccessModel(req.cookie))
            } else {
                resolve(new ErrorModel('未登录'))
            }
        }).catch((err) => {
            return new ErrorModel(err.sqlMessage || err.message)
        })
    }
}

module.exports = userHandle
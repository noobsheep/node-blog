const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const { get, set } = require('../db/redis.js')
const userRouterHandle = (req, res) => {
    // 登录接口
    // console.log('userRouterHandle')
    if (req.method === 'POST' && req.path === '/api/user/login') {
        const loginInfo = login(req.body.username, req.body.password)
        // console.log(req.body.username, req.body.password, 'body')
        // const loginInfo = login(req.query.username, req.query.password)
        return loginInfo.then((result) => {
            // console.log(result, 'result');
            if (result) {
                set(req.cookie.token, {
                    username: result.username,
                    realname: result.realname,
                })
                // req.session.username = result.username
                // req.session.realname = result.realname
                // 操作cookie
                // res.setHeader('Set-Cookie', `token=${result.realname};path=/;expires=${setCookieExpires(7)}; httpOnly`)
                return new SuccessModel('认证成功')
            } else {
                return new ErrorModel('认证失败')
            }
        }).catch((err) => {
            return new ErrorModel(err.sqlMessage || err.message)
        })
    } else if (req.method === 'GET' && req.path === '/api/user/signout') {
        return new Promise((resolve, reject) => {
            if (req.cookie.token) {
                set(req.cookie.token, {});
                resolve(new SuccessModel('退出成功'));
            } else {
                reject(new SuccessModel('退出失败'));
            }
        });
    }
}

const loginCheck = (req, res) => {
    // 新定义验证登录接口 
    if (!req.session.username) {
        return new Promise((resovle, reject) => {
            resovle(new ErrorModel("未登录"))
        })
    }
}



module.exports = {
    userRouterHandle,
    loginCheck,
}
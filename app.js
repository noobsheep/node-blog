const blogRouterHandle = require('./src/route/blog.js')
const userRouterHandle = require('./src/route/user.js')
const { setCookieExpires } = require('./src/utils/utils')
const { get, set } = require('./src/db/redis.js')
const querystring = require('querystring')


// 处理post参数
const postDataHandle = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }

        // req.method !== 'POST' && req.header['Content-type'] !== 'application/json'
        // content type 在get请求中可有可无 

        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', (chunk) => {
            postData = postData + chunk.toString()
        })
        req.on('end', () => {
            if (postData) {
                resolve(JSON.parse(postData))
            } else {
                resolve({})
            }
        })
        console.log('text result')
    })
    return promise
}

const serverHandle = (request, response) => {
    // 处理参数
    const path = request.url.split('?')
    request.query = querystring.parse(path[1])
    request.path = path[0]
    request.type = process.env.NODE_ENV

    // 处理cookie
    request.cookie = {}
    const cookieStr = request.headers.cookie || ''
    cookieStr.split(";").forEach((item) => {
        if (!item) {
            return
        }
        const info = item.split("=")
        request.cookie[info[0]] = info[1];
    })
    console.log(request.cookie, 'cookie');

    // 解析 session
    let needCookie = false
    let token = request.cookie.token
    if (!token) {
        needCookie = true
        token = `${Date.now()}_${Math.random()}`
        // Math.random() 返回的随机数 包括0 不包括1 (0 <= num < 1) 
    }
    request.cookie.token = token
    get(token).then((sessionData) => {
        console.log(sessionData, 'session')
        if (!sessionData) {
            set(token, {})
            request.session = {}
        } else {
            request.session = sessionData
        }
          // POST 处理
        return  postDataHandle(request)
    }).catch((err) => {
        console.log(err)
        request.session = {}
    }).then((postData) => {
    // console.log(sessionData.entries())
    // request.session = sessionData.get(token)

    // 设置返回类型
    // Content 打成了Cotent 返回内容类型错误 导致返回数据乱码.. 上个星期
    response.setHeader("Content-Type", "application/json; charset=UTF-8")
        request.body = postData
        
        // 处理 blog 路由
        const blogHandleInfo = blogRouterHandle(request, response)
        if (blogHandleInfo) {
            blogHandleInfo.then((blogHandleData) => {
                if (needCookie) {
                    response.setHeader('Set-Cookie', `token=${token};path=/;expires=${setCookieExpires(7)}; httpOnly`)
                }
                response.end(JSON.stringify(blogHandleData))
            })
            return
        }

        // 处理 user 路由
        const userHandleInfo = userRouterHandle(request, response)
        if (userHandleInfo) {
            userHandleInfo.then((userInfo) => {
                if (needCookie) {
                    response.setHeader('Set-Cookie', `token=${token};path=/;expires=${setCookieExpires(7)}; httpOnly`)
                }
                response.end(JSON.stringify(userInfo))
            })
            return
        }

        // 处理未命中
        response.writeHead(404, { "Content-type": "text/plain; charset=UTF-8" })
        response.write('404 Not Found \n')
        response.end()
    })  
}
module.exports = serverHandle
const blogRouterHandle = require('./src/route/blog.js')
const userRouterHandle = require('./src/route/user.js')
const querystring = require('querystring')


// 处理post参数
const postDataHandle = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST' && req.header['Content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', (chunk) => {
            postData = postData + chunk.toString()
        })
        req.on('end', () => {
            if (postData) {
                resolve(postData)
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

    // 设置返回类型
    // Conten 打成了Cotent 返回内容类型错误 导致返回数据乱码.. 上个星期
    response.setHeader("Content-Type", "application/json; charset=UTF-8")
    // POST 处理
    postDataHandle(request).then((postData) => {
        request.body = postData
        
        // 处理 blog 路由
        const blogHandleInfo = blogRouterHandle(request, response)
        if (blogHandleInfo) {
            response.end(JSON.stringify(blogHandleInfo))
            return
        }

        // 处理 user 路由
        const userHandleInfo = userRouterHandle(request, response)
        if (userHandleInfo) {
            response.end(JSON.stringify(userHandleInfo))
            return
        }

        // 处理未命中
        response.writeHead(404, { "Content-type": "text/plain; charset=UTF-8" })
        response.write('404 Not Found \n')
        response.end()
    })  
}
module.exports = serverHandle
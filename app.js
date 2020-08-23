const blogRouterHandle = require('./src/route/blog.js')
const userRouterHandle = require('./src/route/user.js')
const querystring = require('querystring')

const serverHandle = (requst, response) => {
    //处理参数
    const path = requst.url.split('?')
    requst.query = querystring.parse(path[1])
    requst.path = path[0]
    requst.type = process.env.NODE_ENV 

    // 设置返回类型
    response.setHeader("Cotent-Type", "application/json; charset=UTF-8")
    // 处理 blog 路由
    const blogHandleInfo = blogRouterHandle(requst, response)
    if (blogHandleInfo) {
        response.end(JSON.stringify(blogHandleInfo))
        return
    }

    // 处理 user 路由
    const userHandleInfo = userRouterHandle(requst, response)
    if (userHandleInfo) {
        response.end(JSON.stringify(userHandleInfo))
        return 
    }

    // 处理未命中
    response.writeHead(404, {"Content-type": "text/plain; charset=UTF-8"})
    response.write('404 Not Found \n')
    response.end()
}
module.exports = serverHandle
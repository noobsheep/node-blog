const http = require('http')
const querystring = require('querystring')

const server = http.createServer((requst, response) => {
    const method = requst.method
    const path = requst.url.split('?')
    const pathName = path[0]
    const type = process.env.NODE_ENV
    const query = querystring.parse(path[1])
    const responseData = { path, pathName, query, method, type }
    response.setHeader('Cotent-Type', 'application/json')
    if (method === 'GET') {
        response.end(JSON.stringify(responseData))
    } else if (method === 'POST') {
        let postData = ''
        requst.on('data', chunk => {
            postData += chunk.toString()
        })
        requst.on('end', () => {
            responseData.sendData = postData
            response.end(JSON.stringify(responseData))
        })
    }

})
server.listen(8000) 
// 初始化服务  
const http = require('http') 
const prot = process.env.PROT || 8000 
const serverHandle = require('../app.js')
process.title = 'the service of sheep'
// console.log(process.pid, 'pid');
const server = http.createServer(serverHandle)
server.listen(prot)
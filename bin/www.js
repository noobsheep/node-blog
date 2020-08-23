const http = require('http')
const prot = process.env.PROT || 8000
const serverHandle = require('../app.js')
const server = http.createServer(serverHandle)
server.listen(prot) 
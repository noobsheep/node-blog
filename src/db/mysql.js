const msyql = require('mysql')
const { MYSQL_Config } = require('../config/dbConfig')

// 创建连接对象
let connection = msyql.createConnection(MYSQL_Config)

// 开始连接
connection.connect()

// 统一执行sql

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => { // (错误优先的回调函数)
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
    return promise
}

// 关闭连接
// connection.end();

module.exports = {
    exec
}



const type = process.env.NODE_ENV

let MYSQL_Config

if (type === 'dev') {
    MYSQL_Config = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myblog'
    }
}

// 目前 一样配置等我 搞个服务器在说
if (type === 'production') {
    MYSQL_Config = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_Config
}


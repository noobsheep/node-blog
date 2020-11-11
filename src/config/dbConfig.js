const type = process.env.NODE_ENV

let MYSQL_Config
let REDIS_Config

if (type === 'dev') {
    MYSQL_Config = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myblog'
    }

    REDIS_Config = {
        host: '127.0.0.1',
        port: 6379
    }
}

// 目前配置一样 等我搞个服务器在说
if (type === 'production') {
    MYSQL_Config = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myblog'
    }

    REDIS_Config = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    MYSQL_Config,
    REDIS_Config
}


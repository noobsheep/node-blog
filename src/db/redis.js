const redis = require('redis')
const { REDIS_Config } = require('../config/dbConfig')
const client = redis.createClient(REDIS_Config)

client.on('error', (err) => {
    console.error(err)
})

function set (key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    client.set(key, value, redis.print)
}

function get (key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, value) => {
            // 错误处理
            if (err) {
                reject(err)
                return
            }
            // 获取value为空
            if (value === null) {
                reject(null)
                return
            }
            
            // 转换为json 增加健壮性？
            try {
                resolve(JSON.parse(value))
            } catch (error) {
                resolve(value)
            }
        })
    })
}


// client.quit() 退出
module.exports = {
    set,
    get
}
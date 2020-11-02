/**
 * setCookieExpires
 * 设置cooike过期时间
 * @param { Number} 过期天数
 * @returns { String } 返回UTC格式的时间字符串
 * 
 * */

const setCookieExpires = (day) => {
    const nowTime = new Date()
    nowTime.setTime(nowTime.getTime() + (day * 24 * 60 * 60 * 1000))
    return nowTime.toUTCString()
}

module.exports = {
    setCookieExpires
}
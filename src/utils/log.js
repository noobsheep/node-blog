const fs = require('fs');
const path = require('path');
const { Stream } = require('stream');


/**
 * 把日志写入指定写入流
 * @param {Stream} writeStream 写入流
 * @param {String} log 日志
 */

function writeLog (writeStream, log) { 
    writeStream.write(log + '\n');
}

/**
 * 创建写入流
 * @param {String} logName 文件名
 * @returns {Stream} 
 */

function  createWriteStream(logName) {
    const pathSource = path.join(__dirname, '../', '../', '/log', logName);
    const readStream = fs.createWriteStream(pathSource, {
        flags: 'a',
    })
    return readStream;
}

// 创建写入流
const accessWriteStream = createWriteStream('access.log');
function accessLog (log) {
    writeLog(accessWriteStream, log);
} 

module.exports = {
    accessLog,
}
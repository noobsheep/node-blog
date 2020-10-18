const { exec } = require('../db/mysql')
// 获取列表
const getList = (author, keyword) => {
    // select 字段名（*为全部字段） from 表名 (可以同时查询多个表) where 条件...
    // 多个字段之间使用逗号分割 
    let sql = `select id, title, content, createtime, author from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    // 返回 promise 对象
    return exec(sql)
}
// 获取详情
const getDetail = (id) => {
    return {
        id: 2,
        title: '标题1',
        content: '内容A',
        createTime: 1598166607647,
        aothor: 'zhangyi'
    }
}

// 新增博客 title content author
const addBlog = (blogData = {}) => {

    return {
        id: 3 // 表示插到表里的id
    }
}
// 修改博客 id title content author
const updateBlog = (blogData = {}) => {
    
    return false
}
// 删除博客 id
const delBlog = (blogData = {}) => {
    return true
}
module.exports = { 
    getList,
    getDetail,
    addBlog,
    updateBlog,
    delBlog
}
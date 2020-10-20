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
    const sql = `select * from blogs where id='${id}';`
    return exec(sql).then((result) => {
        return result[0]
    })
}

// 新增博客 title content author
const addBlog = (blogData = {}) => {
    const { title, content, author } = blogData
    const createtime = Date.now();
    //插入 insert into 表名 (插入字段ming 多个字段名之间,号连接)
    const sql = `insert into blogs ( title, content, createtime, author )
        value ( '${title}', '${content}', ${createtime}, '${author}');`
    return exec(sql).then((result) => {
        console.log(result, 'result info ...')
        return {
            id: result.insertId
        }
    })
}

// 修改博客 id title content author
const updateBlog = (id, blogData = {}) => {
    const { title, content, author } = blogData
    const createtime = Date.now();
    const sql = `update blogs set title='${title}', content='${content}',createtime='${createtime}' , author='${author}' where id=${id};`
    return exec(sql).then((result) => {
        return true
    })
}
// 删除博客 id
const delBlog = (id, author) => {
    const sql = `deletes from blogs where id=${id} and author='${author}';`
    return exec(sql).then((result) => {
        return true
    })
}
module.exports = { 
    getList,
    getDetail,
    addBlog,
    updateBlog,
    delBlog
}
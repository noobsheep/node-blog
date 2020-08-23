const { getList } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const bolgHandle = (req, res) => {
    // 博客列表 get
    if (req.method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const blogList = getList(author, keyword)
        return new SuccessModel(blogList)
    }
    // 博客详情 get
    if (req.method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: '获取博客详情'
        }
    }
    // 新建一篇博客 
    if (req.method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: '新建博客接口'
        }
    }
    // 更新一篇博客得接口
    if (req.method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: '获取博客详情'
        }
    }
    // 删除一篇博客
    if (req.method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: '删除博客接口'
        }
    }
}

module.exports = bolgHandle
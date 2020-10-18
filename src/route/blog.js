const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')


function bolgHandle (req, res) {
    // 博客列表 get
    if (req.method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const blogList = await getList(author, keyword)
        const result = getList(author, keyword)
        return result.then((blogList) => {
            return new SuccessModel(blogList)
        }).catch(() => {
            return new ErrorModel("查询错误")
        })
    }
    // 博客详情 get
    if (req.method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        const blogDetail = getDetail(id)
        return new SuccessModel(blogDetail)
    }
    // 新建一篇博客 
    if (req.method === 'POST' && req.path === '/api/blog/new') {
        const data = req.body
        console.log(JSON.parse(req.body), '结果')
        const newblog = addBlog(data)
        return new SuccessModel(newblog)
    }
    // 更新一篇博客得接口
    if (req.method === 'POST' && req.path === '/api/blog/update') {
        const updateResult = updateBlog(req.body)
        if (updateResult) {
            return new SuccessModel(updateResult)
        } else {
           return new ErrorModel("更新失败")
        }
    }
    // 删除一篇博客
    if (req.method === 'POST' && req.path === '/api/blog/del') {
        const delBlogResult = delBlog(req.body)
        if (delBlogResult) {
            return new SuccessModel(delBlogResult)
        } else {
           return new ErrorModel("删除失败")
        }
    }
}

module.exports = bolgHandle
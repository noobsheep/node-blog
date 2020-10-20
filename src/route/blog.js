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
        const result = getDetail(id)
        return result.then((blogDetail) => {
            return new SuccessModel(blogDetail)
        })
    }
    // 新建一篇博客 
    if (req.method === 'POST' && req.path === '/api/blog/new') {
        const data = req.body
        // console.log(JSON.parse(req.body), '结果')
        const result = addBlog(data)
        return result.then((newblog) => {
            return new SuccessModel(newblog)
        })
    }
    // 更新一篇博客得接口
    if (req.method === 'POST' && req.path === '/api/blog/update') {
        const {id, blogData} = req.body
        const result = updateBlog(id, blogData)
        if (result) {
            return result.then((updateResult) => {
                return new SuccessModel(updateResult)
            }, (err) => {
                return new ErrorModel(err.sqlMessage)
            })
        }
    }
    // 删除一篇博客
    if (req.method === 'POST' && req.path === '/api/blog/del') {
        const { id, author } = req.body
        const result = delBlog(id, author)
        if (result) {
            return result.then((delBlogResult) => {
                return new SuccessModel(delBlogResult)
            }).catch((err) => {
                return new ErrorModel(err.sqlMessage)
            })
        }
    }
}

module.exports = bolgHandle
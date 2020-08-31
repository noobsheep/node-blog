// 获取列表
const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: '标题1',
            content: '内容A',
            createTime: 1598166607647,
            aothor: 'zhangyi'
        },
        {
            id: 2,
            title: '标题1',
            content: '内容A',
            createTime: 1598166607647,
            aothor: 'zhangyi'
        }
    ]
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
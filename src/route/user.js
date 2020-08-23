const userHandle = (req, res) => {
    // 登录接口
    if (req.method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg: '这是登录的接口'
        }
    }
}

module.exports = userHandle
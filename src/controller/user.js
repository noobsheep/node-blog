const login = (username, password) => {
    console.log(username, password, 111)
    return (username === 'wan' && password == '123456')
}
    
module.exports = {
    login
}
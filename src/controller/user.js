const { exec, escape } = require("../db/mysql")
const login = (usernames, passwords) => {
    let username = escape(usernames);
    let password = escape(passwords);
    const sql = `select username, realname from users where username=${username} and password=${password};`
    return exec(sql).then((result) => {
        return result[0]
    })
}
    
module.exports = {
    login
}
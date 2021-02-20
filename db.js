//https://www.luiztools.com.br/post/como-usar-nodejs-mysql/
require('dotenv/config');

async function connect() {
    if( global.connection && global.state !== 'disconnected' ) {
        return global.connection
    }
    
    const mysql = require('mysql2/promise');

    const user = process.env.USER
    const password = process.env.PASSWORD
    const host = process.env.HOST
    const port = process.env.PORT
    const schema = process.env.SCHEMA
    const urlString = `mysql://${user}:${password}@${host}:${port}/${schema}`
    const connection = await mysql.createConnection(urlString)
    console.log(`► Conectou no Mysql - Port: ${port}`);
        
    global.connection = connection;
    return connection;
}

module.exports = { 
    connect
}
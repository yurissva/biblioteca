const mysql = require("mysql2")

const pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "librarymanager"
}).promise()

async function connection() {
    await pool.connect((err) => {
        if(err) {
            throw err
        }
        console.log("Mysql connected...")
    })
    pool.destroy()
}
module.exports = {connection, pool}
const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'games_db',
    password: 'Egor1488$',
    port: 5432,
});
module.exports = pool;
const express = require('express');
const app = express();
const pool = require('./db/pool');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/games', async (req, res) =>{
    try{
        const result = await pool.query(`
            SELECT
            games. *,
            genres.name AS genre_name,
            developers.name AS developer_name
            FROM games 
            LEFT JOIN genres ON games.genre_id = genres.id
            LEFT JOIN developers ON games.developer_id = developers.id
            ORDER BY games.id
            `);
            res.render('games/index', {games:result.rows});
    } catch(err){
        console.error(err);
        res.send('Ошибка при загрузке игр');
    }
});
app.get('/games/new', async (req, res) =>{
    const genres = await pool.query('SELECT * FROM genres ORDER BY name');
    const developers = await pool.query('SELECT * FROM developers ORDER BY name');
    res.render('games/new' , {genres: genres.rows, developers: developers.rows});
});
app.get('/games/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    const result = await pool.query(`
        SELECT
        games. *,
        genres.name AS genre_name,
        developers.name AS developer_name
        FROM games 
        LEFT JOIN genres ON games.genre_id = genres.id
        LEFT JOIN developers ON games.developer_id = developers.id
        WHERE games.id = $1
        `, [id]);
        if(result.rows.length === 0){
            return res.status(404).send('Игра не найдена');
        }
        res.render('games/show', {game: result.rows[0]});
});
app.post('/games' , async(req, res) =>{
    const {title, year, genre_id, developer_id} = req.body;
    await pool.query(
        'INSERT INTO games (title, year, genre_id, developer_id) VALUES ($1, $2, $3, $4)',
        [title, year || null, genre_id || null, developer_id || null]
    );
    res.redirect('/games');
});
app.get('/games/:id/edit', async (req, res) =>{
    const id = parseInt(req.params.id);
    const game = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
    const genres = await pool.query('SELECT * FROM genres ORDER BY name ');
    const developers = await pool.query('SELECT * FROM developers ORDER BY name');
    if (game.rows.length === 0){
        return res.status(404).send('Игра не найдена');
    }
    res.render('games/edit',{
        game: game.rows[0],
        genres: genres.rows,
        developers: developers.rows,
    });
});
app.post('/games/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    const {title, year, genre_id, developer_id} = req.body;
    await pool.query(
        `UPDATE games
        SET title = $1, year = $2, genre_id = $3, developer_id = $4
        WHERE id = $5`,
        [title, year || null, genre_id || null, developer_id || null, id]
    );
    res.redirect('/games')
});
app.post('/games/:id/delete', async (req, res) =>{
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM games WHERE id = $1', [id]);
    res.redirect('/games');
});
const PORT = 6767 ;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту http://localhost:${PORT}/games`);
})
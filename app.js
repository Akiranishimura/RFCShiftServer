// server/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./lib/DB/connectDB');
const PORT = process.env.PORT || 3001;



const app = express();

//Enable Session

app.use(cors({
    origin: process.env.CLIENT_URL, // Nuxt.js アプリケーションのオリジン
    credentials: true // クレデンシャル (クッキー、認証情報等) を含むリクエストを許可
}));
//Enable JSON body parsing
app.use(express.json());

//Routes
const authRoutes = require('./lib/auth/login');
app.use('/api/auth', authRoutes);

const user = require('./lib/auth/user');
app.use('/api/auth', user);

const getInfoUser = require('./lib/getInfo/user');
app.use('/api/getInfo', getInfoUser);

const getInfoShiftByUser = require('./lib/getInfo/shiftbyuser');
app.use('/api/getInfo', getInfoShiftByUser);


const db = mysql.createConnection({
    host: 'process.env.DB_HOST',
    user: 'process.env.DB_USER',
    password: 'process.env.DB_PASSWORD',
    database: 'process.env.DB_NAME'
});

// データベースへの接続
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// ユーザーテーブルからデータを取得するAPIエンドポイント
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM USER';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


// app.post('/api/login', (req, res) => {
//     console.log(req.body); // { userId: '...', department: '...' }
//     res.json({ success: true });
// });

app.get("/test", function(req, res){
    res.json({"value" : process.env.CLIENT_URL});
  });

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
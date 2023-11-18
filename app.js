// server/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./lib/DB/connectDB');



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



// app.post('/api/login', (req, res) => {
//     console.log(req.body); // { userId: '...', department: '...' }
//     res.json({ success: true });
// });



app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});
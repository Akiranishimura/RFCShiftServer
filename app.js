// server/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const corsUrl = process.env.CLIENT_URL || provess.env.CLIENT_URL2;

// const db = require('./lib/DB/connectDB');
const PORT = process.env.PORT || 3001;



const app = express();

//Enable Session
//corsをCLIENT_URLとCLIENT_URL2に対して許可する
app.use(cors({
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL2],
    credentials: true
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

const getAllUser = require('./lib/getInfo/alluser');
app.use('/api/getInfo', getAllUser);

const getAllShift = require('./lib/getInfo/allshift');
app.use('/api/getInfo', getAllShift);

const userSearch = require('./lib/getInfo/UserSearch');
app.use('/api/getInfo', userSearch);


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
// user.js
const express = require('express');
const router = express.Router();
const db = require('../DB/connectDB');




function queryWithPromise(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

const query =`SELECT * FROM ComprehensiveShiftView;`

async function findAllShift() {
    // データベースからユーザーを検索
    const result = await queryWithPromise(query);
    return result;
}


router.get('/AllShift/', async (req, res) => {

    const allshift = await findAllShift(); // findUserInDatabaseはユーザーをデータベースから検索する関数
    if (allshift) {
        // const yo = 'yoo'
        console.log(allshift);
        res.json(allshift);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
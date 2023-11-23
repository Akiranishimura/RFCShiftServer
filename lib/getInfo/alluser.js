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

const query =`SELECT UserID, Department,Abbreviation
FROM User
ORDER BY CASE Department
    WHEN '三役' THEN 1
    WHEN '総務局' THEN 2
    WHEN '企画局' THEN 3
    WHEN '渉外局' THEN 4
    WHEN '管理局' THEN 5
    WHEN '広報局' THEN 6
    WHEN 'システム局' THEN 7
    ELSE 8
END;
`

async function findAllUser() {
    // データベースからユーザーを検索
    const result = await queryWithPromise(query);
    return result;
}


router.get('/AllUser/', async (req, res) => {

    const alluser = await findAllUser(); // findUserInDatabaseはユーザーをデータベースから検索する関数
    if (alluser) {
        const yo = 'yoo'
        console.log(alluser);
        res.json(alluser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
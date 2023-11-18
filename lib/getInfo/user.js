// user.js
const express = require('express');
const router = express.Router();
const db = require('../DB/connectDB');




function queryWithPromise(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function findUserInDatabase(userId) {
    // データベースからユーザーを検索
    const result = await queryWithPromise('SELECT * FROM user WHERE UserID = ?', [userId]);
    return result[0];
}


router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log("user ID is" + userId);
    const user = await findUserInDatabase(userId); // findUserInDatabaseはユーザーをデータベースから検索する関数
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
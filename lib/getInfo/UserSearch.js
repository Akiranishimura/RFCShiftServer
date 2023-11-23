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

// データベースからユーザーを検索する関数
async function findUsersByUsername(username) {
    //UserテーブルのNameと部分一致するものを検索する
    const query = `SELECT * FROM user WHERE Name LIKE '%${username}%'`;
    const result = queryWithPromise(query)
    // ここでデータベースからユーザーを検索します。
    // この例では、部分一致の検索
    return result;
}

router.get('/userSearch/:searchWord', async (req, res) => {
    const username = req.params.searchWord;
    const users = await findUsersByUsername(username);
    res.json(users);
});

module.exports = router;
// server/routes/auth.js
const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
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

router.post('/login', async (req, res) => {
    const { userId, department } = req.body;


    // データベースからユーザーを検索
    const user = await findUserInDatabase(userId);
    // console.log(user);
  
    // ユーザーが存在し、userIdとdepartmentが一致するか確認
    if (user && userId == user.UserID && department == user.Department) {
        // ログイン成功

        //JWTを生成
        //change expiresIn to 96h
        console.log(user.UserID)
        const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, { expiresIn: '120h' }); //こんなに長くしてはいけない
        //送信
        res.json({ token });

        // req.session.userId = user.UserID;
        // console.log(req.session.userId);
        // console.log(req.session);
        // console.log("Success!");
        // req.session.save();
        // res.json({ success: true });
      } else {
        // ログイン失敗
        console.log("Failed!");
        res.status(401).send('認証に失敗しました');
        // res.json({ success: false });
      }
    
});

// ./lib/auth/login.js

module.exports = router;



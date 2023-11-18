// shiftAssignment.js
const express = require('express');
const router = express.Router();
const db = require('../DB/connectDB'); // データベース接続をインポート

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
    const result = await queryWithPromise('SELECT * FROM ComprehensiveShiftView WHERE UserID = ?', [userId]);
    return result;
}

router.get('/shiftByUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const shift = await findUserInDatabase(userId);
    if (shift.length > 0) {
        
    // for(let i = 0; i < shiftAssignments.length; i++){

    //     //以下のコードの書き方を改善してください


    //     const shiftID = shiftAssignments[i].ShiftID;
    //     const shift = await findShiftInDatabase(shiftID);
    //     // const Name = shift.Name;
    //     // const Date = shift.Date;
    //     // const StartTime = shift.StartTime;
    //     // const EndTime = shift.EndTime;
    //     // const shiftTypeID = shift.ShiftTypeID;
    //     // const shiftType = await findShiftTypeInDatabase(shiftTypeID);
    //     // const ManualLink = shiftType.ManualLink;

    


    // }
    res.json(shift);


    } else {
        res.status(404).json({ message: 'No shift assignments found for this user' });
    }
});

module.exports = router;
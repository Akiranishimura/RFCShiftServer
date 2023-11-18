const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');



router.get('/user/', (req, res) => {
    const bearToken = req.headers['authorization'];
    const bearer = bearToken.split(' ');
    const token = bearer[1];
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        return res.json({
          user,
        });
      }
    });
  });


  module.exports = router;
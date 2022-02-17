const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {User}= require('./../../db/models')

router.get(
    '/',
    asyncHandler(async function(req, res) {
        const user = await User.findAll();

        if(user){
         return res.json(user);
        }
    })
  );



  module.exports = router;

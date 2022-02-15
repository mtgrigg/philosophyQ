const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {Tweet}= require('./../../db/models')

router.get(
    '/',
    asyncHandler(async function(req,res){
        const tweets = await Tweet.findAll();

        if(tweets){
            return res.json(tweets)
        }
    })
)


module.exports = router;

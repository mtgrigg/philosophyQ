const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {Comment} = require('./../../db/models');


router.get(
    '/',
    asyncHandler(async function(req, res) {
        const comments = await Comment.findAll();

        if(comments){
         return res.json(comments);
        }
    })
  );


  module.exports = router;

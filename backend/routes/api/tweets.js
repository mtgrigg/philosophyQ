const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {Tweet}= require('./../../db/models')
const {Comment}= require('./../../db/models')

router.get(
    '/',
    asyncHandler(async function(req,res){
        const tweets = await Tweet.findAll();

        if(tweets){
            return res.json(tweets)
        }
    })
)

router.get(
    '/:id',
    asyncHandler(async function(req,res){
        const tweets = await Tweet.findByPk(req.params.id);

        if(tweets){
            return res.json(tweets)
        }
    })
)

router.get('/:id/comments', asyncHandler(async function(req, res) {
    const comments = await Comment.findAll({where:{tweetId: req.params.id}});
    return res.json(comments);
  }));

  


module.exports = router;

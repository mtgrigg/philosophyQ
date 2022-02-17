const express = require('express');
const asyncHandler = require('express-async-handler');
const user = require('../../db/models/user');
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
            // res.redirect('/:id')
            return res.json(tweets)
        }
    })
)

router.post(
    '/',
    asyncHandler(async function(req, res) {
        const newTweet = await Tweet.create(req.body);
        console.log(newTweet, "THIS IS NEW TWEET")
        if(newTweet){
            return res.json(newTweet);
        }
    })
  );

  router.get(
    '/',
    asyncHandler(async function(req, res) {
        const user = await User.findAll({where:{userId: user.id}});

        if(user){
         return res.json(user);
        }
    })
  );

  router.put(
    '/:id',
    asyncHandler(async function(req, res) {
        const editedTweet = await Tweet.findByPk(req.params.id);
        const thisTweet= await editedTweet.update(req.body);

        return res.json(thisTweet);

      })

  );





router.get('/:id/comments', asyncHandler(async function(req, res) {
    const comments = await Comment.findAll({where:{tweetId: req.params.id}});
    return res.json(comments);
  }));




module.exports = router;

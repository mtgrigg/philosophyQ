const express = require('express');
const asyncHandler = require('express-async-handler');
const user = require('../../db/models/user');
const router = express.Router();
const {Tweet}= require('./../../db/models')
const {Comment}= require('./../../db/models')

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validatesTweets =[
  check('tweet')
  .exists({ checkFalsy: true })
  .isLength({ min: 1 })
  .withMessage('Please leave a tweet that is at least one character long.'),
  handleValidationErrors,

]

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
    '/', validatesTweets,
    asyncHandler(async function(req, res) {
        const newTweet = await Tweet.create(req.body);
        // console.log(newTweet, "THIS IS NEW TWEET")
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
    '/:id',validatesTweets,
    asyncHandler(async function(req, res) {
        const editedTweet = await Tweet.findByPk(req.params.id);
        const thisTweet= await editedTweet.update(req.body);

        return res.json(thisTweet);

      })

  );


  router.delete(
    '/:id',
    asyncHandler(async function(req, res) {
      const tweet = await Tweet.findByPk(req.params.id);
      if(tweet){
      await tweet.destroy();
      }
      return res.json(req.body);
  })
);





router.get('/:id/comments', asyncHandler(async function(req, res) {
    const comments = await Comment.findAll({where:{tweetId: req.params.id}});
    return res.json(comments);
  }));

  router.post(
    '/:id/comments',
    asyncHandler(async function(req, res, next) {
        const newComment = await Comment.create(req.body);

        return res.json(newComment);
    })
  );

  router.put(
    '/:id(\\d+)/comments',
    asyncHandler(async function(req, res) {

        let editedComment = await Comment.findByPk(req.params.id);

        let thisComment= await editedComment.update(req.body);

        return res.json(thisComment);//editedImage

      })

  );

  router.delete(
    '/:id/comments',
    asyncHandler(async function(req, res) {
    const comment = await Comment.findByPk(req.params.id);
    comment.destroy();
    return res.json(req.body);
  })
);




module.exports = router;

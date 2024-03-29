const express = require("express");

const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");


const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),

  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('imgUrl')
    .notEmpty()
    .isURL({require_protocol: false, require_host: false })
    .withMessage("Must provide a valid URL")
    ,
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {


    const { email, password, username, imgUrl, bio } = req.body;
    // console.log( req.body, "THIS IS REQ BODY")
    const user = await User.signup({ email, username, password, bio, imgUrl });



    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

module.exports = router;

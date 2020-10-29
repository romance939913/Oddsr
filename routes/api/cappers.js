const express = require("express");
const router = express.Router();
const Capper = require('../../models/Capper');
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validations/capperRegister');
const validateLoginInput = require("../../validations/capperLogin")

router.get("/test", (req, res) => {
  res.json({ msg: "this is the cappers route" })
})

router.get("/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Capper
      .find()
      .then(cappers => res.json(cappers))
      .catch(err => res.json(err))
  }
)

router.get("/:capper_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Capper
      .find({ _id: req.params.capper_id })
      .then(capper => res.json(capper))
      .catch(err => res.json(err))
  }
)

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Capper.findOne({ email: req.body.email })
    .then(capper => {
      if (capper) {
        res.status(400).json({ email: "email already exists" })
      } else {
        const newCapper = new Capper({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          bio: req.body.bio,
          sports: req.body.sports
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newCapper.password, salt, (err, hash) => {
            if (err) throw err;
            newCapper.password = hash
            newCapper
              .save()
              .then(capper => {
                const payload = {
                  id: capper.id,
                  username: capper.username,
                  email: capper.email,
                  bio: capper.bio,
                  sports: capper.sports,
                  type: capper.userType
                }
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    });
                  })
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
)

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  Capper.findOne({ email })
    .then(capper => {
      if (!capper) {
        return res.status(400).json({ email: "email entered does not exist" })
      }

      bcrypt.compare(password, capper.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: capper.id,
              username: capper.username,
              email: capper.email,
              bio: capper.bio,
              sports: capper.sports,
              type: capper.userType
            }
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              })
          } else {
            return res.status(400).json({ password: "incorrect password" })
          }
        })
      }
    )
  }
)

module.exports = router;
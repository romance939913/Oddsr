const express = require("express");
const router = express.Router();
const Capper = require('../../models/Capper');
const Pick = require('../../models/Pick');
// const keys = require('../../config/keys');
// const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get("/test", (req, res) => {
  res.json({ msg: "this is the picks route" })
})

router.post("/new_pick/:capper_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPick = new Pick({
      team: req.body.team,
      spread: req.body.spread,
      units: req.body.units,
    })
    newPick
      .save()
      .then(pick => {
        Capper.findOneAndUpdate(
          { _id: req.params.capper_id }, 
          { $push: { picks: pick } },
          (err, success) => {
            if (err) console.log(err);
          });
        res.send(pick)
      })
      .catch(err => console.log(err))
  }
)

router.get("/picks/:capper_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Capper
      .find()
      .then(cappers => res.json(cappers))
      .catch(err => res.json(err))
  }
)

module.exports = router;
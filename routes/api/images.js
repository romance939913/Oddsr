const express = require("express");
const router = express.Router();
const upload = require('../../services/fileUpload');

const singleUpload = upload.single('image');

router.post('/image-upload', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).json({ errors: err.message })
    } else {
      return res.json({ 'imageURL': req.file.location, })
    }
  });
})

module.exports = router;
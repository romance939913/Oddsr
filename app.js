const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const app = express();
const users = require("./routes/api/users");
const cappers = require("./routes/api/cappers");
const bodyparser = require("body-parser");
const passport = require('passport');

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyparser.urlencoded({
  extended: false
}));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Hello world")
})
app.use("/api/users", users)
app.use("/api/cappers", cappers)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch(err => console.log(err))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to LoanCheap" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
const UserRole = db.role;
const dbConfig = require("./config/db.config.js");
db.mongoose
  // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  .connect(
    `mongodb+srv://loancheap12345:${process.env.PASS}@universityapp.brx75x7.mongodb.net/LoanCheap`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected");
    initial();
  })
  .catch((err) => {
    console.error("error", err);
    process.exit();
  });

function initial() {
  UserRole.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new UserRole({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("user added to roles");
      });
      new UserRole({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("admin added to roles");
      });
    }
  });
}
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const express = require("express");
const app = express();
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
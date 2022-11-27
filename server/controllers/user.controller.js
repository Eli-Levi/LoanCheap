exports.userBoard = (req, res) => {
  res.status(200).send("User");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin");
};

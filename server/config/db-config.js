const mongoose = require("mongoose");
const connect_database = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("database connected!"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect_database

const mongoose = require("mongoose");
const connect = () => {
  mongoose
    .connect(process.env.URL)
    .then(() => {
      console.log("database successfully connected ");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connect;

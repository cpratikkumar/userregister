const express = require("express");
const dotenv = require("dotenv");
const connect = require("./connection/connection");
const bcrypt = require("bcryptjs");
const model = require("./model/schema");
const server = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authenticate = require("./middleware/middleware");
const port = process.env.PORT || 8000;

server.use(express.json());
server.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
connect();

//routes
server.post("/register", async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;

    const ispresent = await model.findOne({ email });
    if (!ispresent) {
      const registerUser = new model({
        name,
        dob,
        email,
        password,
      });
      await registerUser.save();
      res.status(200).json({ message: "Successfully register", status: 200 });
    } else {
      return res
        .status(401)
        .json({ message: "User already register", status: 401 });
    }
  } catch (error) {
    console.log(error);
  }
});

server.get("/getuser/:token", authenticate, async (req, res) => {
  const userdata = await model.find();

  res.status(200).json(userdata);
});

server.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const finduser = await model.findOne({ email });
    if (!finduser) {
      res.status(404).json({ status: 404 });
    }
    if (finduser.password !== password) {
      res.status(404).json({ status: 404, message: "User not match" });
    } else {
      const token = jwt.sign({ email }, process.env.KEY, { expiresIn: "1h" });

      res
        .status(200)
        .json({ status: 200, message: "successfully login", token });
    }
  } catch (error) {
    console.log(error);
  }
});

server.listen(port, () => {
  console.log(`Server has been running at port ${port}`);
});

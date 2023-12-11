const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const { jwtDecode } = require("jwt-decode");

app.use(express.json());
app.use(
  cors({
    origin: "https://login-system-0blr.onrender.com/",
    credentials: true,
  })
);
app.use(cookieParser());

const users = [];

app.post("/register", async (req, res) => {
  //Check for empty fields
  if (!req.body.email || !req.body.password) {
    res.status(401).send({
      status: "Bad Request",
      message: "Some fields are missing: username, email, password",
    });
    return;
  }

  try {
    const checkExistingUser = users.find(
      (user) => user.email == req.body.email
    );

    if (checkExistingUser) {
      res.status(401).send({
        status: "Bad Request",
        message: "User already exists",
      });
      return;
    }
    const user = {
      username: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      uuid: uuidv4(),
    };
    users.push(user);
    //send back response when user is saved
    res.status(201).send({
      status: "Saved",
      message: "User has been saved!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong!",
      value: error,
    });
  }
});

app.post("/login", async (req, res) => {
  //Check for empty fields
  if (!req.body.email || !req.body.password) {
    res.status(401).send({
      status: "Bad Request",
      message: "Some fields are missing: email, password",
    });
    return;
  }

  try {
    const checkExistingUser = users.find(
      (user) => user.email == req.body.email
    );

    if (!checkExistingUser) {
      res.status(401).send({
        status: "Bad Request",
        message: "User doesn't exists",
      });
      return;
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkExistingUser.password
    );

    if (!checkPassword) {
      res.status(401).send({
        status: "Bad Request",
        message: "Password incorrect",
      });
      return;
    }

    const token = jwt.sign(checkExistingUser, process.env.SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 100,
      httpOnly: true,
    });
    res.status(200).json({ status: "Connected", message: "Connected !" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong!",
      value: error,
    });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const verify = jwt.verify(token, process.env.SECRET);
    if (verify) {
      next();
    } else {
      res.status(401).send({
        status: "Bad Request",
        message: "Invalid token",
      });
    }
    return;
  }
  res.status(401).send({
    status: "Bad Request",
    message: "Unauhtorized",
  });
  return;
};
app.get("/profile", verifyToken, (req, res) => {
  const token = req.cookies.token;
  const decode = jwtDecode(token);
  console.log(decode);
  res.status(200).json(decode);
});

app.get("/logout", (req, res) => {
  res.cookie("token", "token", {
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({ message: "Disconnected" });
});

app.listen(port, () => {
  console.log(`app listen on http://localhost:${port}`);
});

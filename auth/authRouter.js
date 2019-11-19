const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const Users = require("../users/usersModel.js");

const requiredRegistration = (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;
  if (username && password && firstName && lastName) {
    next();
  } else {
    res.status(400).json({
      message: "Username, password, first name, and last name are required!"
    });
  }
};

const requiredLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    next();
  } else {
    res.status(400).json({
      message: "Username and password are required!"
    });
  }
};

router.post("/register", requiredRegistration, (req, res) => {
  const creds = req.body;
  console.log(creds);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(creds.password, salt);

  Users.insert({ ...creds, password: hash })
    .then(() => {
      Users.getBy({ username: creds.username }).then(user => {
        const token = generateToken(user);
        res.status(201).json({
          id: user.id,
          token
        });
      });
    })
    .catch(err => {
      res.status(500).json({ message: "", error: err });
    });
});


router.post("/login", requiredLogin, (req, res) => {
  const creds = req.body;

  Users.getBy({ username: creds.username })
    .then(user => {
      //Check if passwords are the same
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        newUser = { ...user, isParent: user.isParent === "1" ? true : false };

        res.status(202).json({
          message: "Correct Credentials!",
          user: newUser,
          token
        });
      } else {
        res.status(401).json({ message: "Incorrect Credentials!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database error", error: err });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, 
    username: user.username
    
  };

  const options = {
    expiresIn: "1d" 
  };
  return jwt.sign(payload, secrets.jwtSecret, options); 
}

module.exports = router;
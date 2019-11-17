const router = require("express").Router();
const Users = require("../users/usersModel.js");

/*---------Get user Info---------*/
router.get("/:id", (req, res) => {
  Users.getBy({ id: req.params.id })
    .then(user => {
      if (user) {
        let isNannyBool;
        if (user.isNanny == 1) {
          isNannyBool = true;
        } else {
          isNannyBool = false;
        }
        res.status(200).json({ ...user, isNanny: isNannyBool });
      } else {
        res.status(404).json({ message: "No user with that ID!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database error", error: err });
    });
}); //works without middleware

// Update user information
// Required: id, changes --> returns user object
// incorrect changes --> 500
// Works at 11:56am
/*---------Update User Info---------*/
router.put("/:id", checkID, (req, res) => {
  const changes = req.body;
  const id = req.params;

  Users.update(id, changes)
    .then(user => {
      res.status(200).json({ message: "Updated user", user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Database error (Check your body!)", error: err });
    });
});

/*---------Delete User/Account---------*/
router.delete("/:id", checkID, (req, res) => {
  const id = req.params;

  Users.deleteUser(id)
    .then(user => {
      user
        ? res.status(200).json({ message: "Deleted user" })
        : res.status(404).json({ message: "User does not exist!" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Database error", error: err });
    });
});

function checkID(req, res, next) {
  Users.getBy({ id: req.params.id })
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "No user with that ID!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database error", error: err });
    });
}

module.exports = router;
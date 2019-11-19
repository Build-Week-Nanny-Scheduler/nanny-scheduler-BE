const router = require("express").Router();
const Requests = require("../requests/requestsModel.js");

/* --- Insert a request -- */
router.post("/", (req, res) => {
  const {
    requesterUserID,
    city,
    state,
    numberOfKids,
    kidsAge,
    timeNeeded
  } = req.body;
  //Required Fields
  console.log(req.body);
  if (requesterUserID && city && state && numberOfKids && kidsAge && timeNeeded) {
    Requests.insert(req.body)
      .then(response => {
        if (response) {
          res.status(200).json({ message: "Insertion Successful!" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Database Error", error });
      });
  } else {
    res
      .status(400)
      .json({
        message:
          "You are missing either name, city, state, number of kids and their ages, or when you need a nanny!"
      });
  }
});

/* --UPDATE a request */
router.put("/:requestID", (req, res) => {
  console.log(req.body);
  const changes = req.body;

  const { requestID } = req.params;

  console.log(changes, requestID);

  Requests.update(requestID, changes)
    .then(response => {
      console.log(response);
      res.status(200).json({ message: "Request Updated!" });
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error", error });
    });
});

/* DELETE a request */
router.delete("/:requestID", (req, res) => {
  const { requestID } = req.params;

  Requests.deleteRequest(requestID)
    .then(response => {
      if (response) {
        res.status(200).json({ message: "Request Deleted!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error", error });
    });
});
/* GET all requests - Filter */
router.get("/all", (req, res) => {
  let { filter, except } = req.body;

  filter = !filter ? {} : filter;
  except = !except ? {} : except;

  Requests.getAll(filter, except)
    .then(responses => {
      console.log(responses);
      boolResponses = responses.map(r => {
        return { ...r, accepted: r.accepted === 0 ? false : true };
      });
      res.status(200).json(boolResponses);
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error", error });
    });
});

module.exports = router;
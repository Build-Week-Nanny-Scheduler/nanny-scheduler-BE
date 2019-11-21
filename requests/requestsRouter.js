const router = require("express").Router();
const requests = require("../requests/requestsModel.js");

/* --- Insert a request -- */
router.post("/", async (req, res) => {
  const userID = req.decodedToken.subject.toString();
	const { nannyUserID, accepted, name, city, state, numberOfKids, kidsAges, timeNeeded } = req.body;
  console.log('from post router payload',req.decodedToken)
  console.log('nanny id',nannyUserID);
  if ( accepted || name || city || state || numberOfKids || kidsAges || timeNeeded) {
    let userRequest ={
      requesterUserID:userID,
      nannyUserID:nannyUserID,
      accepted:accepted, 
      name:name,
      city:city,
      state:state,
      numberOfKids:numberOfKids,
      kidsAges:kidsAges,
      timeNeeded:timeNeeded
    }
    console.log(userRequest)
      try{
        const result= await requests.insert(userRequest)
        if(result){
          console.log('hello from request results',result);
          res.status(200).json({
            message:'insert successful!'
          }) 
        } else {
          res
            .status(400)
            .json({
              message:
                "You are missing either name, city, state, number of kids and their ages, or when you need a nanny!"
            });
        }
      }
      catch(error) {
        console.log(error.message);
        res.status(500).json({ message: "Database Error", error });
      };
  };
});
/* --UPDATE a request */
router.put("/:requestID", (req, res) => {
  console.log(req.body);
  const changes = req.body;

  const { requestID } = req.params;

  console.log(changes, requestID);

  requests.update(requestID, changes)
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

  requests.deleteRequest(requestID)
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
  console.log('hello from all requests');
  let { filter, except } = req.body;

  filter = !filter ? {} : filter;
  except = !except ? {} : except;

  requests.getAll(filter, except)
    .then(responses => {
      // console.log(responses);
      boolResponses = responses.map(r => {
        return { ...r, accepted: r.accepted === false ? false : true };
      });
      res.status(200).json(boolResponses);
    })
    .catch(error => {
      res.status(500).json({ message: "Server Error", error });
    });
});

module.exports = router;
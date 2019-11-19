const db = require("../data/dbConfig.js");


const getAll = (filter, except) => {
  console.log(filter, except);
  return db("requests")
    .where(filter)
    .whereNot(except);
};

const insert = request => {
  return db("requests").insert(request);
};

const update = (requestID, changes) => {
  console.log("in update", requestID, changes);
  return db("requests")
    .where({ id: requestID })
    .update(changes);
};

const deleteRequest = id => {
  console.log(id);
  console.log({ id: id });
  return db("requests")
    .where({ id: id })
    .del();
};
module.exports = {
  getAll,
  insert,
  update,
  deleteRequest
};
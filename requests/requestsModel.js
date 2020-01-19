const db = require("../data/dbConfig.js");


const getAll = (filter, except) => {
  console.log(filter, except);
  return db("requests")
    .where(filter)
    .whereNot(except);
};

async function insert(request) {
  const result = await db("requests").insert(request);
  console.log('from the request model', request);
  return result;
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
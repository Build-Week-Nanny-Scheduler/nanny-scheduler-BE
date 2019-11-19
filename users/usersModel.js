const db = require("../data/dbConfig.js");
//database helper functions
const insert = user=> {
  return db("users").insert(user, "id");
};

const find = () => {
  return db("users");
};

const getBy = prop => {
  return db("users")
    .where(prop)
    .first();
};

const update = (id, changes) => {
  return db("users")
    .where(id)
    .update(changes)
    .then(res => {
      console.log("res", res, id);
      if (res === 1) {
        return getBy(id);
      } else {
        return undefined;
      }
    });
};

const deleteUser = id => {
  return getBy(id).then(res => {
    console.log(res);
    if (res) {
      return db("users")
        .where(id)
        .del();
    }
  });
};

module.exports = {
  insert,
  getBy,
  update,
  deleteUser,
  find
};
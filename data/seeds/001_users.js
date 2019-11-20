
const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
   
      // Inserts seed entries
      return knex("users").insert([
        {
          id:1,
          username: "amber12",
          password: bcrypt.hashSync("amber123", bcrypt.genSaltSync(10)),
          firstName: "Amber",
          lastName: "Smith",
          city:"Provo",
          isNanny: false
        },
        {
          id:2,
          username: "user01",
          password: bcrypt.hashSync("user001", bcrypt.genSaltSync(10)),
          firstName: "Devin",
          lastName: "Jackson",
          city:"Detroit",
          isNanny: true
        },
        {
          id:3,
          username: "taco_luver2",
          password: bcrypt.hashSync("taco_luver", bcrypt.genSaltSync(10)),
          firstName: "Tony",
          lastName: "Stark",
          city:"Starkville",
          isNanny: false
        }
      ]);
};
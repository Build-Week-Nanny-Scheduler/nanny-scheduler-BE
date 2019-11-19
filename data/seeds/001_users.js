const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
   
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "amber123",
          password: bcrypt.hashSync("amber123", bcrypt.genSaltSync(10)),
          firstName: "Amber",
          lastName: "Smith",
          city:"Provo",
          isNanny: false
        },
        {
          username: "user001",
          password: bcrypt.hashSync("user001", bcrypt.genSaltSync(10)),
          firstName: "Devin",
          lastName: "Jackson",
          city:"Detroit",
          isNanny: true
        },
        {
          username: "taco_luver",
          password: bcrypt.hashSync("taco_luver", bcrypt.genSaltSync(10)),
          firstName: "Tony",
          lastName: "Stark",
          city:"Starkville",
          isNanny: false
        }
      ]);
};
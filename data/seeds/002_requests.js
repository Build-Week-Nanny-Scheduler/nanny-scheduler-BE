exports.seed = function(knex) {
  // Inserts seed entries
  return knex("requests").insert([
    {
      requesterUserID: 1,
      nannyUserID: 2,
      accepted: true,
      name: "Tiffany",
      city: "Detroit",
      state: 'Michigan',
      numberOfKids: '2',
      kidsAges:"one and five",
      timeNeeded: "MWF from 2-6"
    },
    {
      requesterUserID: 1,
      nannyUserID:2,
      accepted: false,
      name: "Angela",
      city: "Provo",
      state: 'Utah',
      numberOfKids: '4',
      kidsAges:"five and seven",
      timeNeeded: "Tuesday and Thursday from 5-9"
    },
    {
      requesterUserID: 3,
      nannyUserID: 2,
      accepted: true,
      name: "Amanda",
      city: "Riverside",
      state:'California',
      numberOfKids: '3',
      kidsAges:" 6, 7, 9",
      timeNeeded: "Friday from 1-5"
    },
    {
      requesterUserID: 3,
      nannyUserID:2,
      accepted: false,
      name: "Dave",
      city: "Pocatello",
      state:'Idaho',
      numberOfKids: '4',
      kidsAges:"3, 5, 7, 9",
      timeNeeded: "this Saturday from 8-7"
    },
    {
      requesterUserID: 3,
      nannyUserID: 2,
      accepted: true,
      name: "Kate",
      city: "Las Vegas",
      state:'Nevada',
      numberOfKids: '1',
      kidsAges:"4",
      timeNeeded: "Saturday and Sunday round the clock"
    }
  ]);
};

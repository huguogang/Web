// Data generation
var mapper = function ($1, $2) {
  var struct = {
    test: $1,
    answers: _.map($2.split(','), function (s) { return s.trim(); })
  };
  return [$1,
    $2,
    JSON.stringify(struct)];
};

var TypingData = {
  "Latin/Stagin 1": [
    { "test": "atrium", "answers": ["reception hall"] },
    { "test": "canis", "answers": ["dog"] },
    { "test": "coquus", "answers": ["cooks"] },
    { "test": "cubiculum", "answers": ["bedroom"] },
    { "test": "culina", "answers": ["kitchen"] },
    { "test": "est", "answers": ["is"] },
    { "test": "filius", "answers": ["son"] },
    { "test": "hortus", "answers": ["garden"] },
    { "test": "in", "answers": ["in", "on"] },
    { "test": "laborat", "answers": ["is working", "works"] },
    { "test": "mater", "answers": ["mother"] },
    { "test": "pater", "answers": ["father"] },
    { "test": "dad", "answers": ["poop"] },
    { "test": "arete", "answers": ["virtue"] },
    { "test": "kakia", "answers": ["vice", "poop"] },
    { "test": "sedet", "answers": ["sits", "is sitting"] },
    { "test": "servus", "answers": ["slave", "servant"] },
    { "test": "tablinium", "answers": ["study"] },
    { "test": "triclinium", "answers": ["dining room"] },
    { "test": "via", "answers": ["street"] }
  ],
  Latin2Eng: [
    {
      "test": "canis",
      "answers": ["dog", "hound"]
    },
    {
      "test": "villa",
      "answers": ["town", "farm", "village", "house"]
    },
    {
      "test": "est",
      "answers": ["is"]
    },
    {
      "test": "pater",
      "answers": ["father"]
    },
    {
      "test": "mater",
      "answers": ["mother"]
    },
    {
      "test": "filius",
      "answers": ["son"]
    },
    {
      "test": "servus",
      "answers": ["slave"]
    },
    {
      "test": "coquus",
      "answers": ["cook"]
    },
    {
      "test": "scribit",
      "answers": ["is writing"]
    },
    {
      "test": "sedet",
      "answers": ["is sitting"]
    },
    {
      "test": "bibit",
      "answers": ["is drinking"]
    },
    {
      "test": "laborat",
      "answers": ["is working"]
    },
    {
      "test": "dormit",
      "answers": ["is sleeping"]
    },

  ],
  Chinese2Eng: [
    {
      "test": "山",
      "answers": ["mountain", "hill"]
    }
  ]
};

// Data generation
var mapper = function ($1, $2) {
  var struct = {
    test: $1,
    answers: _.map($2.split(','), function (s) { return s.trim(); })
  };
  return [$1,
    $2,
    JSON.stringify(struct) + ","];
};

var TypingData = {
  "Latin/Unit1/Stage1": [
    { "test": "atrium", "answers": ["reception hall", "atrium"] },
    { "test": "canis", "answers": ["dog"] },
    { "test": "coquus", "answers": ["cook"] },
    { "test": "cubiculum", "answers": ["bedroom"] },
    { "test": "culina", "answers": ["kitchen"] },
    { "test": "est", "answers": ["is"] },
    { "test": "filius", "answers": ["son"] },
    { "test": "hortus", "answers": ["garden"] },
    { "test": "in", "answers": ["in", "on"] },
    { "test": "laborat", "answers": ["is working", "works"] },
    { "test": "mater", "answers": ["mother"] },
    { "test": "pater", "answers": ["father"] },
    { "test": "sedet", "answers": ["sits", "is sitting"] },
    { "test": "servus", "answers": ["slave", "servant"] },
    { "test": "tablinium", "answers": ["study"] },
    { "test": "triclinium", "answers": ["dining room"] },
    { "test": "via", "answers": ["street"] }
  ],
  "Latin/Unit1/Stage2": [
    { "test": "amicus", "answers": ["friend"] },
    { "test": "ancilla", "answers": ["slave girl", "slave woman"] },
    { "test": "cena", "answers": ["dinner", "supper"] },
    { "test": "cibus", "answers": ["food"] },
    { "test": "dominus", "answers": ["master"] },
    { "test": "dormit", "answers": ["sleeps"] },
    { "test": "gustat", "answers": ["tastes", "eats"] },
    { "test": "intrat", "answers": ["enters"] },
    { "test": "laetus", "answers": ["happy"] },
    { "test": "laudat", "answers": ["praises", "praise"] },
    { "test": "mensa", "answers": ["table"] },
    { "test": "mercator", "answers": ["merchant"] },
    { "test": "quoque", "answers": ["also", "too"] },
    { "test": "salutat", "answers": ["greets", "salutes"] },
    { "test": "toga", "answers": ["toga"] },
    { "test": "tunica", "answers": ["tunic"] },
  ],
  "Latin/Unit1/Stage3": [
    { "test": "ad", "answers": ["to"] },
    { "test": "bibit", "answers": ["drinks"] },
    { "test": "circumspectat", "answers": ["looks around"] },
    { "test": "clamat", "answers": ["shouts"] },
    { "test": "ecce", "answers": ["see", "look"] },
    { "test": "et", "answers": ["and"] },
    { "test": "exit", "answers": ["exit", "goes out"] },
    { "test": "exspectat", "answers": ["waits for"] },
    { "test": "forum", "answers": ["forum", "business center"] },
    { "test": "ianua", "answers": ["door"] },
    { "test": "iratus", "answers": ["angry", "mad"] },
    { "test": "leo", "answers": ["lion"] },
    { "test": "magnus", "answers": ["big", "large", "great"] },
    { "test": "navis", "answers": ["ship"] },
    { "test": "non", "answers": ["not", "is not"] },
    { "test": "portat", "answers": ["carries"] },
    { "test": "respondet", "answers": ["responds", "replies"] },
    { "test": "ridet", "answers": ["laughs", "smiles"] },
    { "test": "salve", "answers": ["hi", "hello"] },
    { "test": "surgit", "answers": ["gets up", "rises"] },
    { "test": "taberna", "answers": ["store", "shop", "inn"] },
    { "test": "videt", "answers": ["sees", "looks"] },
    { "test": "villa", "answers": ["house", "village", "farm"] },
    { "test": "vinum", "answers": ["wine", "vinegar"] }
  ],
  "Latin/Unit1/Stage4": [
    { "test": "agit", "answers": ["does"] },
    { "test": "negotium agit", "answers": ["does business"] },
    { "test": "anulus", "answers": ["ring"] },
    { "test": "cera", "answers": ["wax", "wax tablet"] },
    { "test": "coquit", "answers": ["cooks"] },
    { "test": "cur", "answers": ["why"] },
    { "test": "e, ex", "answers": ["out of", "from"] },
    { "test": "ego", "answers": ["I"] },
    { "test": "eheu", "answers": ["alas", "oh dear"] },
    { "test": "habet", "answers": ["has", "had"] },
    { "test": "inquit", "answers": ["says"] },
    { "test": "iudex", "answers": ["judge"] },
    { "test": "mendax", "answers": ["liar"] },
    { "test": "pecunia", "answers": ["money"] },
    { "test": "perterritus", "answers": ["terrified"] },
    { "test": "poeta", "answers": ["poet"] },
    { "test": "quaerit", "answers": ["searches for", "looks for", "searches", "looks"] },
    { "test": "quis", "answers": ["who"] },
    { "test": "reddit", "answers": ["gives back"] },
    { "test": "satis", "answers": ["enough"] },
    { "test": "sed", "answers": ["but"] },
    { "test": "signum", "answers": ["sign", "seal", "signal"] },
    { "test": "tu", "answers": ["you"] },
    { "test": "vendit", "answers": ["sells"] },
    { "test": "vocat", "answers": ["calls"] }
  ],
  "Latin/Unit1/Stage5": [
    { "test": "adest", "answers": ["is here"] },
    { "test": "adsunt", "answers": ["are"] },
    { "test": "audit", "answers": ["hears", "listens to"] },
    { "test": "clamor", "answers": ["shout", "uproar"] },
    { "test": "contendit", "answers": ["hurries"] },
    { "test": "currit", "answers": ["runs"] },
    { "test": "euge!", "answers": ["hurrah"] },
    { "test": "fabula", "answers": ["play", "show", "story"] },
    { "test": "fabulam agit", "answers": ["acts in a play"] },
    { "test": "femina", "answers": ["woman"] },
    { "test": "hodie", "answers": ["taday"] },
    { "test": "iuvenis", "answers": ["young man"] },
    { "test": "meus", "answers": ["my", "mine"] },
    { "test": "multus", "answers": ["much"] },
    { "test": "multi", "answers": ["many"] },
    { "test": "optimus", "answers": ["very good", "excellent", "best"] },
    { "test": "petit", "answers": ["heads for", "attacks", "seeks", "looks for", "searches for"] },
    { "test": "plaudit", "answers": ["applauds", "claps"] },
    { "test": "puella", "answers": ["girl"] },
    { "test": "senex", "answers": ["old man"] },
    { "test": "spectat", "answers": ["looks at", "watches"] },
    { "test": "stat", "answers": ["stands"] },
    { "test": "turba", "answers": ["crowd"] },
    { "test": "ubi", "answers": ["where"] },
    { "test": "urbs", "answers": ["city"] },
    { "test": "venit", "answers": ["comes"] }
  ],
  "Latin/Conjugation": [
    { "test": "how do you translate verb-o", "answers": ["I verb"] },
    { "test": "how do you translate verb-s", "answers": ["you verb"] },
    { "test": "how do you translate verb-t", "answers": ["he verb", "she verb", "it verb"] },
    { "test": "how do you translate verb-mus", "answers": ["we verb"] },
    { "test": "how do you translate verb-tis", "answers": ["you all verb", "ya'll verb"] },
    { "test": "how do you translate verb-nt", "answers": ["they verb", "they all verb"] }
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

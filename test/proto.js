QUnit.config.reorder = false;

QUnit
  .cases([{
    protoText: 'persons { \
                        name: "huguogang" \
                        age: 100 \
                        books: "book1" \
                        books: "book2" \
                } \
                persons { \
                        name: "another guy" \
                        age: 101 \
                        nested { \
                          layer3: 3 \
                        } \
                        empty: "" \
                }',
    expected: {persons: [
      {
        "name": "huguogang",
        "age": 100,
        "books": ["book1", "book2"]
      },
      {
        "name": "another guy",
        "age": 101,
        "nested": {
          "layer3": 3
        },
        "empty": ""
      }
    ]}
  }])
  .useTitleTemplate(true)
  .test("Parse Proto Text Format", function (params) {
    var ret = parseProto(params.protoText);
    console.log(ret);
    console.log(params.expected);
    ok(_.isEqual(ret, params.expected));
  });
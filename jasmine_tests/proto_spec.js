/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../js/proto.js"/>

describe("parseProto", function() {
  beforeEach(function() {
    // setup code here
  });

  it("should parse empty string", function() {
    var protoText = "";
    var expected = {};
    
    var actual = parseProto(protoText);

    //demonstrates use of custom matcher
    expect(actual).toEqual(expected);
  });
  
  it("should parse number", function() {
    var protoText = "age: 100";
    var expected = {"age": 100};
    
    var actual = parseProto(protoText);

    //demonstrates use of custom matcher
    expect(actual).toEqual(expected);
  });
  
  it("should parse string", function() {
    var protoText = 'name: "string"';
    var expected = {"name": "string"};
    
    var actual = parseProto(protoText);

    //demonstrates use of custom matcher
    expect(actual).toEqual(expected);
  });
  
  it("should parse array", function() {
    var protoText = 'books: "book1" \
      books: "book2"';
    var expected = {"books": ["book1", "book2"]};
    
    var actual = parseProto(protoText);

    //demonstrates use of custom matcher
    expect(actual).toEqual(expected);
  });
  
  it("should ignore bad input", function() {
    // the part after "," is ignored
    var protoText = "age: 100, height: 8";
    var expected = {"age": 100};
    
    var actual = parseProto(protoText);

    //demonstrates use of custom matcher
    expect(actual).toEqual(expected);
  });
  
  it("should parse complex proto text", function() {
    var protoText = 
        'persons { \
          name: "huguogang" \
          age: 100 \
          books: "book1" \
          books: "book2" \
          books: "book3" \
        } \
        persons { \
          name: "another guy" \
          age: 101 \
          nested { \
            layer3: 3 \
          } \
          empty: "" \
        } \
        persons { \
          name: "third guy" \
          age: 1 \
        }';
    var expected = { 
      persons: [
      {
        "name": "huguogang",
        "age": 100,
        "books": ["book1", "book2", "book3"]
      },
      {
        "name": "another guy",
        "age": 101,
        "nested": {
          "layer3": 3
        },
        "empty": ""
      },
      {
        "name": "third guy",
        "age": 1
      }]};
    
    var actual = parseProto(protoText);

    //demonstrates use of custom matcher
    expect(actual).toEqual(expected);
  });
});

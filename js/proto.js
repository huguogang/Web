/// <reference path="../typings/underscore/underscore.d.ts"/>

// A rudimentary parser of Google Protocol Buffer Text Format
// Convert protoText to a JSON object.
function parseProto(protoText) {
  var symbols = [
    "identifier",
    "number",
    "string",
    "openBrace",
    "closeBrace",
    "colon",
    "whitespace"];
    
  // Regular expression matchers for each symbol.
  // Reference: https://github.com/google/closure-library/blob/master/closure/goog/proto2/textformatserializer.js
  var regexes = {
    identifier: /^[a-zA-Z][a-zA-Z0-9_]*/,
    number: /^(0x[0-9a-f]+)|(([-])?[0-9][0-9]*(\.?[0-9]+)?(e[+-]?[0-9]+|[f])?)/,
    openBrace: /^{/,
    closeBrace: /^}/,
    string: new RegExp('^"([^"\\\\]|\\\\.)*"'),
    colon: /^:/,
    whitespace: /^\s+/
  };

  // Scans for next symbol. Return undefined if the text is empty, or we have
  // malformatted/unexpected format.
  var nextSymbol = function (text) {
    var result;

    _.some(symbols, function (symbol) {
      var match = regexes[symbol].exec(text);
      if (match && match.index == 0) {
        result = {
          symbol: symbol,   // symbol name
          value: match[0],  // actual matched string of the symbol
          // the remaining text that need to be scanned
          restOfText: text.substring(match[0].length)
        };
        return true;
      }
      return false;
    });

    return result;
  }

  // The root JSON object.
  var root = {};
  // Stack of object tree traverse.
  var objects = [root];
  // Identifier of the object that we are working on.
  var identifiers = [];

  // Processes the symbol, build the JSON object tree.
  var processSymbol = function (symbol) {
    var val;
    switch (symbol.symbol) {
      case "number":
        val = parseFloat(symbol.value);
        break;
      case "string":
        val = symbol.value;
        val = val.slice(1, val.length - 1);
        break;
      case "openBrace": // start a struct
        objects.push({});
        return;
        break;
      case "closeBrace": // close current struct
        val = objects.pop();
        break;
      case "identifier":
        identifiers.push(symbol.value);
        return;
      case "colon": // not a struct
      case "whitespace":
      default:
        return;
    }
    
    // If we come to here, the symbol has generated a value
    // We will look at the top of "objects" and "identifier"
    // stack to find the home for this value in the final JSON
    // object.
    var obj = _.last(objects);
    var id = _.last(identifiers);
    
    // Try to guess if this is a repeated value (because this parser
    // does not have proto message definition). So, if a repeated field
    // has 0 or 1 value, this parser will get the resulting JSON type wrong.
    if (_.isUndefined(obj[id])) {
      obj[id] = val;
    }
    else {
      // The same identifier showed up more than once, we assume it is repeated
      // field, use array
      if (!_.isArray(obj[id])) {
        obj[id] = [obj[id]];
      }
      obj[id].push(val);
    }
    identifiers.pop();
  };

  var text = protoText;

  while (true) {
    var symbol = nextSymbol(text);
    if (symbol) {
      text = symbol.restOfText;
      console.log(symbol);
      processSymbol(symbol);
    }
    else {
      break;
    }
  }

  return root;
}
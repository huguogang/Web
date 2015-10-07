// dependencies: underscore
function parseProto(protoText) {
  var symbols = ["identifier", "number", "string", "openBrace", "closeBrace",
    "colon", "whitespace"];
  var regexes = {
    identifier: /^[a-zA-Z][a-zA-Z0-9_]*/,
    number: /^(0x[0-9a-f]+)|(([-])?[0-9][0-9]*(\.?[0-9]+)?(e[+-]?[0-9]+|[f])?)/,
    openBrace: /^{/,
    closeBrace: /^}/,
    string: new RegExp('^"([^"\\\\]|\\\\.)*"'),
    colon: /^:/,
    whitespace: /^\s+/
  };

  var nextSymbol = function (text) {
    var result;
    
    _.some(symbols, function (symbol) {
      var match = regexes[symbol].exec(text);
      if (match && match.index == 0) {
        result = {
          symbol: symbol,
          value: match[0],
          restOfText: text.substring(match[0].length)
        };
        return true;
      }
      return false;
    });
    
    return result;
  }

  var root = {};
  var objects = [root];
  var identifiers = [];
  
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
    var obj = _.last(objects);
    var id = _.last(identifiers);
    if (_.isUndefined(obj[id])) {
      obj[id] = val;
    }
    else {
      obj[id] = [obj[id]];
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
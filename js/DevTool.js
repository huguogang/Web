/// <reference path="../typings/underscore/underscore.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/zeroclipboard-2.2.0/ZeroClipboard.min.js"/>

// We are not scared of big red error messages!
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' \nScript: ' + url + ' \nLine: ' + lineNumber +
    ' \nColumn: ' + column + ' \nStackTrace: ' + errorObj);
};

$(document).ready(function () {
  var cpButton = new ZeroClipboard(document.getElementById("copy-button"));
  var showResult = function (result) {
    $("#templateOutput").val(result);
    $('#copy-button').attr('data-clipboard-text', result);
    $('#codeGenResultModal').modal('show');
  };
  var toUpperCamelCase = function (str) {
    var arr = str.split(/[-_ ]/);
    return _.map(arr, function (ele) {
      var ret = ele.toLowerCase();
      if (ret) {
        return ret.substr(0, 1).toUpperCase() + ret.substr(1);
      }
    }).join("");
  };
  cpButton.on("ready", function (readyEvent) {
    $("#copy-button").removeClass("hidden");

    cpButton.on("aftercopy", function (event) {
      // `this` === `client`
      // `event.target` === the element that was clicked
      // event.target.style.display = "none";
      // alert("Copied text to clipboard: " + event.data["text/plain"]);
    });
  });

  $('#btnGenCode').click(function () {
    var template = $("#template").val();
    var output = [];
    var result = "";
    var inputIdx;

    for (inputIdx = 1; inputIdx <= 3; ++inputIdx) {
      // TODO: result is messy if the text boxes does not have equal number of rows
      var input = $("#input" + inputIdx).val().trim();
      if (!input) {
        continue;
      }
      var arr = _(input.split("\n"))
        .map(function (e) { return e.trim(); });
      var i;
      for (i = 0; i < arr.length; ++i) {
        if (!output[i]) {
          output[i] = template;
        }
        var re = RegExp('\\$' + inputIdx, 'g');
        output[i] = output[i].replace(re, arr[i]);
      }
    }
    //TODO
    // Add transformation:
    //    Lower camel to upper camel
    //    under score to l/U camel
    //    Camel to underscore
    //    cap first letter (l/u camel conversion)
    //    All cap
    //    All lower
    // alternative repalce: #1, &1, *1, !1, `1, ...
    // split text box content to the other boxes
    // ASCII code <-> char
    // Auto sequence: 0, 1, 2, 3, 4, .... $~
    // Pretty Proto (Java: Message.toString format)
    result = output.join('');
    showResult(result);
  });
  $('#btnToB64').click(function () {
    var template = $("#template").val();
    var result = btoa(template);
    showResult(result);
  });
  $('#btnFromB64').click(function () {
    var template = $("#template").val();
    try {
      var result = atob(template);
      showResult(result);
    }
    catch (err) {
      alert(err.message);
    }
  });
  $('#btnUrlEncode').click(function () {
    var template = $("#template").val();
    var result = encodeURI(template);
    showResult(result);
  });

  $('#btnUrlDecode').click(function () {
    var template = $("#template").val();
    var result = decodeURI(template);
    showResult(result);
  });

  $('#btnHtmlEncode').click(function () {
    var template = $("#template").val();
    var result = _.escape(template);
    showResult(result);
  });
  $('#btnMap').click(function () {
    // map all three input using the code, then fill them back to the three input text
    var template = $("#template").val();
    var mapper = new Function("$1", "$2", "$3", template);

    var arr1 = $("#input1").val().split("\n");
    var arr2 = $("#input2").val().split("\n");
    var arr3 = $("#input3").val().split("\n");

    var maxLen = _.max([arr1.length, arr2.length, arr3.length]);
    var i;
    var ret;
    var out$1 = "", out$2 = "", out$3 = "";
    for (i = 0; i < maxLen; i++) {
      if (i > 0) {
        out$1 += "\n";
        out$2 += "\n";
        out$3 += "\n";
      }

      ret = mapper(arr1[i] || "", arr2[i] || "", arr3[i] || "");

      if (_.isArray(ret)) {
        out$1 += ret[0] || "";
        out$2 += ret[1] || "";
        out$3 += ret[2] || "";
      }
      else {
        out$1 += ret;
      }
    }

    $("#input1").val(out$1);
    $("#input2").val(out$2);
    $("#input3").val(out$3);

  });
  $('#btnMapProto').click(function () {
    // map all proto messages in $1, then fill them back to the two input text
    // sample input:
    /*
    'persons { \
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
    }'
    */
    // sample tempalte: return [$1.name, $1.age];
    var template = $("#template").val();
    var mapper = new Function("$1", template);

    var protoText = $("#input1").val();
    var protoMessages = parseProto(protoText);

    if (_.keys(protoMessages).length === 0) {
      return; // no proto data in $1
    }

    if (_.keys(protoMessages).length > 1) {
      alert("There are more than one top level message types. The mapper is designed to map a single type of top level message only.");
    }
    
    // assume there will only be one top level key
    protoMessages = protoMessages[_.keys(protoMessages)[0]];
    if (!_.isArray(protoMessages)) {
      protoMessages = [protoMessages];
    }

    var i;
    var ret;
    var out$2 = "", out$3 = "";
    for (i = 0; i < protoMessages.length; i++) {
      if (i > 0) {
        out$2 += "\n";
        out$3 += "\n";
      }

      ret = mapper(protoMessages[i]);

      if (_.isArray(ret)) {
        out$2 += ret[0] || "";
        out$3 += ret[1] || "";
      }
      else {
        out$2 += ret;
      }
    }

    $("#input2").val(out$2);
    $("#input3").val(out$3);
  });

  //opt-in tooltip, popover
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
});
/// <reference path="../typings/underscore/underscore.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/zeroclipboard-2.2.0/ZeroClipboard.min.js"/>

// We are not scared of big red error messages!
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' \nScript: ' + url + ' \nLine: ' + lineNumber
		+ ' \nColumn: ' + column + ' \nStackTrace: ' + errorObj);
}

$(document).ready(function () {
	var cpButton = new ZeroClipboard(document.getElementById("copy-button"));
	var showResult = function (result) {
		$("#templateOutput").val(result);
		$('#copy-button').attr('data-clipboard-text', result);
		$('#codeGenResultModal').modal('show');
	};
	var toUpperCamelCase = function(str) {
		var arr = str.split(/[-_ ]/);
		return _.map(arr, function(ele) {
			 var ret = ele.toLowerCase();
			 if(ret) {
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
		var inputs
		for (inputIdx = 1; inputIdx <= 3; ++inputIdx) {
			// TODO: result is messy if the text boxes does not have equal number of rows
			var input = $("#input" + inputIdx).val().trim();
			if(!input) {
				continue;
			}
			var arr = _(input.split("\n"))
				.map(function (e) { return e.trim() });
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
		catch(err) {
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
});
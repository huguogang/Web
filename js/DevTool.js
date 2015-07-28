/// <reference path="../typings/underscore/underscore.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/zeroclipboard-2.2.0/ZeroClipboard.min.js"/>
$(document).ready(function () {
	var cpButton = new ZeroClipboard(document.getElementById("copy-button"));

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
		for(inputIdx = 1; inputIdx <= 3; ++inputIdx) {
			// TODO: result is messy if the text boxes does not have equal number of rows
			debugger;
			var input = $("#input" + inputIdx).val();
			var arr = _(input.split("\n"))
				.map(function (e) { return e.trim()});
			var i;
			for (i = 0; i < arr.length; ++i) {
				if (!output[i]) {
					output[i] = template;
				}
				output[i] = output[i].replace("$" + inputIdx, arr[i]);
			}
		}
		//TODO
		// Expand to any text area input
		// Add transformation:
		//    Lower camel to upper camel
		//    under score to l/U camel
		//    Camel to underscore
		//    cap first letter (l/u camel conversion)
		//    All cap
		//    All lower
		// alternative repalce: #1, &1, *1, !1, `1, ...
		// split text box content to the other boxes
		// regex test
		// base64 encode/decode
		// ASCII code
		// URL encode/decode
		// MySQL <-> Java type mapping
		// MSSQL <-> C# type mapping
		// Auto sequence: 0, 1, 2, 3, 4, .... $~
		// Option to trim string or not
		// Pretty JSON? or even show it in tree?
		// save/retrieve templates (what is the backend?)
		result = output.join('');
		$("#templateOutput").val(result);
		$('#codeGenResultModal').modal('show');
		$('#copy-button').attr('data-clipboard-text', result);
	});
});
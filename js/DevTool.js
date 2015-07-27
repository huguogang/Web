/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/zeroclipboard-2.2.0/ZeroClipboard.min.js"/>
$(document).ready(function () {
	var cpButton = new ZeroClipboard(document.getElementById("copy-button"));

	cpButton.on("ready", function (readyEvent) {
		alert( "ZeroClipboard SWF is ready!" );

		cpButton.on("aftercopy", function (event) {
			// `this` === `client`
			// `event.target` === the element that was clicked
			event.target.style.display = "none";
			alert("Copied text to clipboard: " + event.data["text/plain"]);
		});
	});

	$('#btnGenCode').click(function () {
		$('#codeGenResultModal').modal('show');
	});
});
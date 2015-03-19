(function(){
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");
	editor.setOptions({
		maxLines: 1
	});
})();


$(function() {

	$("#editor").on("keydown", function(e){
		var regex = "",
			editor;

		if( e.which === 13 ) {
			editor = ace.edit("editor");
			regex = editor.getValue();
			try {
				new RegExp(regex, "g");
				doMatching(regex);
			} catch (error) {
				doClear();
			}
			
			e.preventDefault();
		}
	});
});

function doMatching(regex) {
	var matchedGroup = $("#matchedArea > ul > li");
	var unmatchedGroup = $("#unmatchedArea > ul > li");

	matchedGroup.each( function(index, element) {
		var li = $(element);
		var text = li.html();
		var r = new RegExp(regex, "g");

		console.log("r: " + r);

		if( r.test(text) ) {
			li.removeClass("normal").addClass("matched");
		} else {
			li.removeClass("matched").addClass("normal");
		}
	});
	unmatchedGroup.each( function(index, element) {
		var li = $(element);
		var text = li.html();
		var r = new RegExp(regex, "g");

		if( r.test(text) ) {
			li.removeClass("unmatched").addClass("normal");
		} else {
			li.removeClass("normal").addClass("unmatched");
		}
	});
}

function doClear() {
	var liGroup = $("#contentsWrapper li");

	liGroup.each( function(index, element) {
		var li = $(element);
		li.removeClass("unmatched").removeClass("matched").addClass("normal");
	});

}

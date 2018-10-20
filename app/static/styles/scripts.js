$(document).ready(function(){

	var input = $("#inputBox");

	function showPredictedTexts(){
		if(input.val() == ""){
			$("ul").hide();
		}
		else{
			$("ul").show()
		}
	}

	function choosePredictedText(e){
		console.log(e.keyCode);
		if(e.keyCode == 12){
			lastIndex = input.val().lastIndexOf(" ") + 1;
			input.val(input.val().substring(0, lastIndex));
			input.val($("#inputBox").val() + $("#middle").text() + " ");
			$()
		}
		else if(e.keyCode == 34){
			lastIndex = input.val().lastIndexOf(" ") + 1;
			input.val(input.val().substring(0, lastIndex));
			input.val($("#inputBox").val() + $("#right").text() + " ");
		}
		else if(e.keyCode == 35){
			lastIndex = input.val().lastIndexOf(" ") + 1;
			input.val(input.val().substring(0, lastIndex));
			input.val($("#inputBox").val() + $("#left").text() + " ");
		}

		input.focus();
		var tmpStr = input.val();
		input.val('');
		input.val(tmpStr);
	}

	input.keyup(showPredictedTexts);

	input.keydown(function(e){
		choosePredictedText(e);
	});
});